"use client";
import { formatToman } from "@/lib/utils";
import { getCart } from "@/queries/cart";
import { useMutationState, useQuery } from "@tanstack/react-query";
import React from "react";

export default function CartSummeryInfo() {
  const { data } = useQuery(getCart);
  const couponData = useMutationState({
    filters: { mutationKey: ["discount-code"], status: "success" },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (mu) => mu.state.data as any,
  })[0];
  return (
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

      <div className=" flex  justify-between text-base font-bold pt-2 border-t border-border">
        <span>مبلغ قابل پرداخت</span>
        <span className="text-primary">
          {formatToman(couponData ? couponData.payable : data?.total)}
        </span>
      </div>
    </div>
  );
}
