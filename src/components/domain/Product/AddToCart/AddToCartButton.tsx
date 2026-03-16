"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import QuantitySelect from "./QuantitySelect";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartItem, getCart, updateCartItem } from "@/queries/cart/cart";
import { Product } from "@/types/product";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import LimitedStock from "./LimitedStock";
import { toast } from "sonner";
import CartAddedToastContent from "../CartAddedToastContent";
import ProductShipping from "./ProductShipping";
import useProductVariantUrl from "@/hooks/useProductVariantUrl";
import { Loader2, StoreIcon, ZapIcon } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

type Props = {
  product: Product;
  children: React.ReactNode;
};

export default function AddToCartButton({
  product: { variants, ...product },
  children,
}: Props) {
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const mounted = useMounted();
  const { selectedVariant: variant } = useProductVariantUrl(variants);

  const { user } = useCurrentUser();

  const { isPending: isAdding, mutateAsync: addToCart } =
    useMutation(addCartItem);

  const { mutate: updateCart } = useMutation(updateCartItem);

  const { data: cart, isLoading: isCartLoading } = useQuery({
    ...getCart,
    enabled: mounted,
  });

  if (!mounted || isCartLoading) {
    // در زمان SSR و تا mount شدن کلاینت، فقط placeholder یا دکمه خام نشان بده
    return (
      <div className="h-12 flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // پیدا کردن آیتم در سبد خرید (با توجه به variant)
  const cartItem = cart?.items?.find((item) =>
    variant
      ? item.variant?.id === variant.id
      : item.product.id === product.id && !item.variant,
  );

  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity ?? 0;

  // حداکثر تعداد مجاز
  const maxQty =
    product.order_limit || (variant?.stock ?? product.stock ?? 9999);

  const isOutOfStock = maxQty <= 0;

  const handleAddToCart = () => {
    if (!user) {
      setOpenLoginDialog(true);
      return;
    }

    addToCart(
      {
        productId: product.id,
        variantId: variant?.id ?? null,
        quantity: 1,
      },
      {
        onSuccess: () => {
          toast.custom(
            (t) => (
              <CartAddedToastContent
                productImage={product.media_pinned?.url}
                productName={product.name}
                t={t}
              />
            ),
            { dismissible: false },
          );
        },
        onError: (err) => {
          toast.error("خطا در افزودن به سبد خرید");
          console.error(err);
        },
      },
    );
  };

  const handleQuantityChange = (newQty: number) => {
    if (!cartItem) return;

    if (newQty <= 0) {
      // اگر به صفر رسید → می‌توانید حذف کنید یا فقط ۰ بگذارید
      updateCart({ itemId: cartItem.id, quantity: 0 });
    } else {
      updateCart({ itemId: cartItem.id, quantity: newQty });
    }
  };

  if (isCartLoading) {
    return (
      <div className="h-12 flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 -mt-1">
      <LoginRequiredDialog
        usage="cart"
        open={openLoginDialog}
        onOpenChange={setOpenLoginDialog}
      />

      <div className="flex flex-col gap-4 rounded-lg lg:border lg:border-slate-200 lg:p-4">
        <div className="flex flex-col gap-4">
          {!isOutOfStock ? (
            <div className="hidden lg:flex items-center text-green-700 text-xs gap-2">
              <StoreIcon className="size-4 text-green-700" />
              موجود در انبار آرشاب
            </div>
          ) : (
            ""
          )}

          <div className="hidden lg:flex items-center text-secondary text-xs gap-2">
            <ZapIcon className="text-secondary size-4" />
            ارسال در سریع ترین زمان
          </div>
        </div>

        <ProductShipping
          is_same_day_shipping={product.is_same_day_shipping}
          preparation_days={product.preparation_days}
          requires_preparation={product.requires_preparation}
        />
        <LimitedStock
          stock={variant?.stock ?? product.stock ?? 0}
          is_limited_stock={product.is_limited_stock}
        />
      </div>
      {children}

      {!isInCart ? (
        <Button
          size="md"
          fullWidth
          disabled={isAdding || isOutOfStock}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال افزودن...
            </>
          ) : isOutOfStock ? (
            "ناموجود"
          ) : (
            "افزودن به سبد خرید"
          )}
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <QuantitySelect
            qty={currentQuantity}
            maxQty={maxQty}
            onChange={handleQuantityChange}
          />

          <div className="flex flex-col text-sm text-muted-foreground">
            <span>در سبد شما</span>
            <Link href="/cart" className="text-primary hover:underline">
              مشاهده سبد خرید →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
