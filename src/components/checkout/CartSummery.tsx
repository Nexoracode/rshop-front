"use client";

import Image from "next/image";
import { cn, formatToman } from "@/lib/utils";
import { useMutationState, useQuery } from "@tanstack/react-query";

import { getCart } from "@/queries/cart";
import { Skeleton } from "../ui/skeleton";
import CreateOrderBtn from "./CreateOrderBtn";

const PRODUCT_PLACEHOLDER = "/images/placeholder.png";

export default function CartSummary() {
  const { data, isFetching } = useQuery(getCart);
  const couponData = useMutationState({
    filters: { mutationKey: ["discount-code"], status: "success" },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (mu) => mu.state.data as any,
  })[0];

  return (
    <div className={cn("space-y-3")}>
      <div className="divide-y divide-border">
        {isFetching ? (
          <Skeleton />
        ) : (
          data?.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={item.product.media_pinned?.url ?? PRODUCT_PLACEHOLDER}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 text-right">
                  <p className="text-sm font-medium text-foreground">
                    {item.product.name}
                  </p>
                  <div className="flex gap-1">
                    {item.variant?.attributes.map((i) => (
                      <p key={i.id} className="text-sm">
                        <span className="text-muted font-light">
                          {i.attribute.name}
                        </span>{" "}
                        :{" "}
                        <span className="font-semibold text-neutral-800">
                          {i.value.value}
                        </span>
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">
                      تعداد: {item.quantity}
                    </p>

                    <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                      {item.line_total} تومان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-muted-foreground">
          <span className="text-sm">جمع کل ({data?.total_quantity} کالا)</span>
          <span className="font-semibold">
            {formatToman(data?.subtotal ?? 0)}
          </span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>مقدار تخفیف</span>
          <span className="text-danger-600">
            {" "}
            -{" "}
            {formatToman(
              (data?.discount_total ?? 0) + (couponData?.discount ?? 0)
            )}
          </span>
        </div>

        <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-primary">
            {formatToman(couponData ? couponData.payable : data?.total)}
          </span>
        </div>
      </div>

      <CreateOrderBtn />
    </div>
  );
}
