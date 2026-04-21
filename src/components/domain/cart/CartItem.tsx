"use client";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import Image from "next/image";
import React from "react";
import QuantitySelect from "../Product/AddToCart/QuantitySelect";
import { UserCartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItem, updateCartItem } from "@/queries/cart/cart";
import PriceBox from "@/components/shared/product/PriceBox";
import CartItemVariant from "@/components/layout/Header/CartPopver/CartItemVariant";

export default function CartItem({
  id,
  product,
  variant,
  quantity,
  discount,
  line_total,
}: UserCartItem) {
  const { mutate: deleteItem, isPending: deletePending } =
    useMutation(deleteCartItem);
  const { mutate: updateItem, isPending: updatePending } =
    useMutation(updateCartItem);
  const handleQtyChange = (qty: number) => {
    if (qty === 0) deleteItem({ itemId: id });
    else updateItem({ itemId: id, quantity: qty });
  };
  return (
    <div
      key={id}
      className="border-b pb-5 last:pb-0 border-slate-200 last:border-0"
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-4">
        <div className="w-full sm:w-fit flex items-center gap-4">
          <Image
            src={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
            alt={product.name}
            width={100}
            height={100}
            className="h-[100px] border sm:border-0 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{product.name}</div>
            </div>

            {variant ? <CartItemVariant variant={variant} /> : ""}
          </div>
        </div>

        <div className="flex w-full sm:w-fit sm:flex-col sm:h-[100px] md:h-fit sm:pt-1.5 md:pt-0 md:flex-row gap-8 items-end md:items-center justify-between sm:justify-center">
          <div className="flex flex-col justify-end sm:items-end">
            {+discount > 0 && (
              <PriceBox
                className="font-medium text-[13px] text-green-600 mb-1"
                suffix="تومان تخفیف"
                price={+discount * quantity}
                iconClass="size-5.5"
                showToman={false}
              />
            )}
            <PriceBox className="font-medium" price={+line_total} />
          </div>
          <QuantitySelect
            maxQty={product.stock}
            onChange={handleQtyChange}
            qty={quantity}
            loading={deletePending || updatePending}
          />
        </div>
      </div>
    </div>
  );
}
