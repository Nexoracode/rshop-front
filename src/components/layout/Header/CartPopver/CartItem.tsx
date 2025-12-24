"use client";
import QuantitySelect from "@/components/Product/AddToCart/QuantitySelect";
import { PopoverClose } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { UserCartItem } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = UserCartItem & {
  loading: boolean;
  onChange: (qty: number) => void;
};
export default function CartItem({ onChange, loading, ...item }: Props) {
  return (
    <div className="flex items-center gap-3 border-b last:border-b-0 py-2">
      <PopoverClose asChild>
        <Link href={`/p/rsp-${item.id}`}>
          <Image
            src={item.product.media_pinned?.url || PRODUCT_PLACEHOLDER}
            width={160}
            height={160}
            alt=""
            className="size-16 rounded-md bg-muted"
          />
        </Link>
      </PopoverClose>
      <div className="flex-1">
        <div className="text-base font-medium line-clamp-1">
          {item.product.name}
        </div>
        {/*  {item.variant ? (
              <div>
                {item.variant.attributes.map((attr) => (
                  <p key={attr.id}>
                    {attr.name} : {attr.values.value}
                  </p>
                ))}
              </div>
            ) : null} */}
        <div className="flex gap-1">
          {item.variant?.attributes
            .sort(
              (a, b) => a.attribute.display_order - b.attribute.display_order
            )
            .map((i) => (
              <>
                <p className="text-sm" key={i.id}>
                  <span className="font-light text-muted">
                    {i.attribute.name}
                  </span>{" "}
                  :{" "}
                  <span className="font-semibold text-neutral-900">
                    {i.value.value}
                  </span>
                </p>
                <Separator orientation="vertical" />
              </>
            ))}
        </div>
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
