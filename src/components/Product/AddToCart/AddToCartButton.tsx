"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import QuantitySelect from "./QuantitySelect";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartItem, getCart, updateCartItem } from "@/queries/cart";
import { Product } from "@/types/product";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useProductPage } from "../ProductProvider";
import LimitedStock from "./LimitedStock";
import { toast } from "sonner";
import CartAddedToastContent from "../CartAddedToastContent";
import ProductShipping from "./ProductShipping";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [open, setOpen] = React.useState(false);
  const { user } = useCurrentUser();

  const { variant } = useProductPage();
  const { isPending, mutateAsync: addToCart } = useMutation(addCartItem);

  const { mutate: updateCart } = useMutation(updateCartItem);

  const { data: cart } = useQuery(getCart);

  const inCartItem = cart?.items.find((i) =>
    variant ? variant.id === i.variant?.id : i.product.id === product.id
  );

  const handleAddToCart = () => {
    if (!user) return setOpen(true);
    addToCart(
      {
        productId: product.id,
        variantId: variant?.id ?? null,
        quantity: 1,
      },
      {
        onSuccess: () =>
          toast.custom(
            (t) => (
              <CartAddedToastContent
                productImage={product.media_pinned?.url}
                productName={product.name}
                t={t}
              />
            ),
            { dismissible: false }
          ),
      }
    );
  };

  const handleUpdateItemCart = (qty: number) => {
    if (!inCartItem) return;
    updateCart({
      itemId: inCartItem.id,
      quantity: qty,
    });
  };

  const productStock = variant ? variant.stock : product.stock;
  return (
    <div className="flex flex-col  gap-2">
      <LoginRequiredDialog usage="cart" open={open} onOpenChange={setOpen} />
      <LimitedStock
        stock={variant?.stock || product.stock}
        is_limited_stock={product.is_limited_stock}
      />
      {!inCartItem ? (
        productStock > 0 ? (
          <Button
            size={"md"}
            fullWidth
            isLoading={isPending}
            onClick={handleAddToCart}
          >
            افزودن به سبد خرید
          </Button>
        ) : (
          <Button size={"lg"} fullWidth disabled>
            نا موجود
          </Button>
        )
      ) : (
        <div className="flex gap-3">
          <QuantitySelect
            qty={inCartItem.quantity}
            maxQty={productStock}
            onChange={handleUpdateItemCart}
          />
          <div className="flex flex-col justify-between">
            <p className="text-xs">در سبد شما</p>

            <div className="text-sm">
              مشاهده{" "}
              <Link className="text-blue-500" href={"/cart"}>
                سبد خرید
              </Link>
            </div>
          </div>
        </div>
      )}
      <ProductShipping
        is_same_day_shipping={product.is_same_day_shipping}
        preparation_days={product.preparation_days}
        requires_preparation={product.requires_preparation}
      />
    </div>
  );
}
