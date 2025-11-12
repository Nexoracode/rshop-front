import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { formatToman } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import QuantitySelect from "../product/QuantitySelect";
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
      className="p-3 border gap-4 rounded-lg flex justify-between items-center"
    >
      <div>
        <Image
          src={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={product.name}
          width={50}
          height={50}
        />
      </div>

      <div className="flex-1">
        <div className="font-medium">{product.name}</div>
        <div>{variant?.name}</div>
        <div className="text-sm text-muted-foreground">
          {quantity} × {formatToman(+unit_price)}
        </div>
      </div>

      <div>
        <QuantitySelect
          maxQty={product.stock}
          onChange={() => {}}
          qty={quantity}
        />
      </div>

      <div>مجموع: {formatToman(quantity * +unit_price)}</div>
    </div>
  );
}
