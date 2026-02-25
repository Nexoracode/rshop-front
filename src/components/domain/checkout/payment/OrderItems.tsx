import React from "react";

import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { OrderItem } from "@/types/order";
import { formatToman } from "@/lib/utils/price";

export default function OrderItems({ items }: { items: Array<OrderItem> }) {
  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-3">
          <div className="flex items-stretch gap-3 flex-1">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
              <Image
                src={item.product.image ?? PRODUCT_PLACEHOLDER}
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
                {item.variant?.attributes
                  .sort((a, b) => a.display_color - b.display_color)
                  .map((i) => (
                    <p
                      key={i.name}
                      className="text-xs px-1 border-l-2 first:pr-0 last:border-l-0"
                    >
                      <span className="text-muted font-light">{i.name}</span> :{" "}
                      <span className="font-semibold text-neutral-800">
                        {i.value}
                      </span>
                    </p>
                  ))}
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">
                  تعداد: {item.quantity}
                </p>

                <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                  {formatToman(Number(item.line_total))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
