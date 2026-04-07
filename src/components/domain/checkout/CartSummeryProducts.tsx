"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart/cart";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { formatToman } from "@/lib/utils/price";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartSummeryProducts() {
  const { data, isFetching } = useQuery(getCart);
  return (
    <div className="divide-y space-y-2 divide-border">
      {isFetching ? (
        <Skeleton />
      ) : (
        data?.items.map((item) => (
          <div key={item.id} className="flex items-center pb-1 justify-between">
            <div className="flex items-stretch gap-3 flex-1">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={item.product.media_pinned?.url ?? PRODUCT_PLACEHOLDER}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 justify-evenly text-right">
                <p className="text-sm font-medium text-foreground">
                  {item.product.name}
                </p>
                <div className="flex gap-1">
                  {item.variant?.attributes.map((i) => (
                    <p key={i.id} className="text-sm">
                      <span className="text-muted font-normal">
                        {i.attribute.name}
                      </span>{" "}
                      :{" "}
                      <span className="font-medium text-neutral-800">
                        {i.value.value}
                      </span>
                    </p>
                  ))}
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    تعداد: {item.quantity}
                  </p>

                  <p className="text-sm font-medium text-foreground whitespace-nowrap">
                    {formatToman(Number(item.line_total))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
