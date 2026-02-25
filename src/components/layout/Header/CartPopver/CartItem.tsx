"use client";
import QuantitySelect from "@/components/domain/Product/AddToCart/QuantitySelect";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { UserCartItem } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartItemVariant from "./CartItemVariant";

type Props = UserCartItem & {
  loading: boolean;
  onChange: (qty: number) => void;
};
export default function CartItem({ onChange, loading, ...item }: Props) {
  return (
    <div className="flex items-center gap-3 border-b last:border-b-0 py-2">
      <Link target="_blank" href={`/p/rsp-${item.id}`}>
        <Image
          src={item.product.media_pinned?.url || PRODUCT_PLACEHOLDER}
          width={160}
          height={160}
          alt=""
          className="size-16 rounded-md bg-muted"
        />
      </Link>
      <div className="flex-1">
        <div className="text-base font-medium line-clamp-1">
          {item.product.name}
        </div>
        <CartItemVariant variant={item.variant} />
        <div className="text-sm">
          {item.quantity} ×{" "}
          {(+item.unit_price - +item.discount).toLocaleString()} تومان
        </div>
      </div>
      <QuantitySelect
        qty={item.quantity}
        maxQty={item.product.stock}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
}
