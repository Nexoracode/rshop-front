"use client";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import Image from "next/image";
import React from "react";
import QuantitySelect from "../Product/AddToCart/QuantitySelect";
import { UserCartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItem, updateCartItem } from "@/queries/cart/cart";
import PriceBox from "@/components/shared/product/PriceBox";

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
      className="p-3 border rounded-lg flex flex-col justify-between items-stretch"
    >
      <div className="flex gap-4">
        <Image
          src={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={product.name}
          width={100}
          height={100}
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium">{product.name}</div>
            {variant && (
              <div className="flex gap-1">
                {variant.attributes.map((attr) => (
                  <div key={attr.id} className="text-xs  text-slate-600">
                    {attr.attribute.name + " " + attr.value.value}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {+discount > 0 && (
                <PriceBox
                  className="inline-block font-medium text-[10px] text-rose-600"
                  suffix="تخفیف"
                  price={+discount * quantity}
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
    </div>
  );
}
