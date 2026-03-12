"use client";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import Image from "next/image";
import React from "react";
import QuantitySelect from "../Product/AddToCart/QuantitySelect";
import { UserCartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItem, updateCartItem } from "@/queries/cart/cart";
import { formatToman } from "@/lib/utils/price";

export default function CartItem({
  id,
  product,
  variant,
  quantity,
  unit_price,
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
      className="p-4 border gap-4 rounded-lg flex justify-between items-stretch"
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
            <div className="text-sm font-semibold">{product.name}</div>
            <p className="text-sm font-semibold">{variant?.name}</p>
            <div className="text-sm text-muted">
              {quantity} × {formatToman(+unit_price)}
            </div>
          </div>

          <div className="text-sm font-semibold">
            {formatToman(quantity * +unit_price)}
          </div>
        </div>
      </div>
      <QuantitySelect
        maxQty={product.stock}
        onChange={handleQtyChange}
        qty={quantity}
        loading={deletePending || updatePending}
      />
    </div>
  );
}
