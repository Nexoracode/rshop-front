"use client";
import React from "react";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { OrderItem } from "@/types/order";
import { formatToman } from "@/lib/utils/price";

export default function OrderItems({ items }: { items: Array<OrderItem> }) {
  return items.map((item) => {
    const attrs = item.variant?.attributes ?? [];

    return (
      <div
        key={item.id}
        className="border-b py-4 first:pt-0 last:pb-0 border-slate-200 last:border-0"
      >
        <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-4">
          {/* left */}
          <div className="w-full sm:w-fit flex items-center gap-4">
            <Image
              src={item.product.image ?? PRODUCT_PLACEHOLDER}
              alt={"image"}
              width={100}
              height={100}
              className="h-[100px] border sm:border-0 object-cover rounded-lg bg-slate-50"
            />

            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{item.product.name}</div>
              </div>

              {/* variant مثل CartItemVariant */}
              {item.variant && (
                <div className="flex gap-1">
                  {attrs.map((attr, index) => (
                    <React.Fragment key={index}>
                      <p className="text-sm flex items-center gap-1">
                        {/* اگر رنگ داشت */}
                        {attr.display_color ? (
                          <span
                            className="w-3 h-3 ml-1 rounded-full inline-block"
                            style={{ backgroundColor: attr.display_color }}
                          />
                        ) : (
                          <>
                            <span className="font-normal text-muted !text-[13px]">
                              {attr.name}
                            </span>{" "}
                            :{" "}
                          </>
                        )}

                        <span className="font-medium text-neutral-900 !text-[13px]">
                          {attr.value}
                        </span>
                      </p>

                      {/* separator */}
                      {index !== attrs.length - 1 && (
                        <span className="w-px h-4 bg-border mx-1" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* right */}
          <div className="flex w-full sm:w-fit sm:flex-col sm:h-[100px] md:h-fit sm:pt-1.5 md:pt-0 md:flex-row gap-8 items-end md:items-center justify-between sm:justify-center">
            <div className="flex flex-col justify-end sm:items-end">
              {+item.discount > 0 && (
                <p className="font-medium text-sm text-green-600 mb-1">
                  {formatToman(Number(item.discount) * item.quantity)} تخفیف
                </p>
              )}

              <p className="font-medium text-[17px]">
                {formatToman(Number(item.line_total), false)}{" "}
                <span className="text-xs text-slate-500">تومان</span>
              </p>
            </div>

            {/* فقط نمایش quantity */}
            <p className="text-primary-500">
              {item.quantity.toLocaleString("fa")} عدد
            </p>
          </div>
        </div>
      </div>
    );
  });
}
