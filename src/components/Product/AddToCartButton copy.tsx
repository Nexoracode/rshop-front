"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import QuantitySelect from "./QuantitySelect";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartItem, getCart, updateCartItem } from "@/queries/cart";
import { Product } from "@/types/product";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import useCurrentUser from "@/hooks/useCurrentUser";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const { user } = useCurrentUser();
  const variant_id = searchParams.get("variant_id");
  const selectedVariant = variant_id
    ? product.variants.find((i) => i.id === Number(variant_id))
    : null;
  const { isPending, mutate: addToCart } = useMutation(addCartItem);

  const { mutate: updateCart } = useMutation(updateCartItem);

  const { data: cart } = useQuery(getCart);

  const inCartItem = cart?.items.find((i) =>
    selectedVariant
      ? selectedVariant.id === i.variant?.id
      : i.product.id === product.id
  );

  const handleAddToCart = () => {
    if (!user) return setOpen(true);
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id ?? null,
      quantity: 1,
    });
  };

  const handleUpdateItemCart = (qty: number) => {
    if (!inCartItem) return;
    updateCart({
      itemId: inCartItem.id,
      quantity: qty,
    });
  };

  const productStock = selectedVariant ? selectedVariant.stock : product.stock;
  return (
    <div className="flex flex-col  gap-2">
      <LoginRequiredDialog usage="cart" open={open} onOpenChange={setOpen} />
      {!inCartItem ? (
        productStock > 0 ? (
          <Button
            size={"lg"}
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
    </div>
  );
}
