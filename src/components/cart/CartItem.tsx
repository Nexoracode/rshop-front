import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { formatToman } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import QuantitySelect from "../Product/QuantitySelect";
import { UserCartItem } from "@/types/cart";

export default function CartItem({
  id,
  product,
  variant,
  quantity,
  unit_price,
}: UserCartItem) {
  return (
    <div
      key={id}
      className="p-3 border gap-4 rounded-lg flex justify-between items-stretch"
    >
      <div>
        <Image
          src={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={product.name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <div className="text-sm font-semibold">{product.name}</div>
          <p className="text-sm font-semibold">{variant?.name}</p>
          <div className="text-sm text-muted">
            {quantity} × {formatToman(+unit_price)}
          </div>
        </div>

        <div className="flex w-full items-center">
          <QuantitySelect
            maxQty={product.stock}
            onChange={() => {}}
            qty={quantity}
          />
          <div className="text-sm font-semibold ps-3">
            {formatToman(quantity * +unit_price)}
          </div>
        </div>
      </div>
    </div>
  );
}
