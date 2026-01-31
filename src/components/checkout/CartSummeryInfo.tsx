"use client";
import useCheckout from "@/hooks/useCheckout";
import { formatToman } from "@/lib/utils";
import { getCart } from "@/queries/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CartSummeryInfo() {
  const { data } = useQuery(getCart);
  const { orderMeta } = useCheckout();
  return (
    <div className="space-y-2 border-t pt-4">
      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm">جمع کل ({data?.total_quantity} کالا)</span>
        <span className="font-semibold">
          {formatToman(data?.subtotal ?? 0)}
        </span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm">مقدار تخفیف</span>
        <span className="text-danger-600">
          {" "}
          -{" "}
          {formatToman((data?.discount_total ?? 0) + orderMeta.discount_amount)}
        </span>
      </div>

      <div className=" flex  justify-between text-base font-bold pt-2 border-t border-border">
        <span className="text-sm">مبلغ قابل پرداخت</span>
        <span className="text-primary">
          {formatToman((data?.total ?? 0) - orderMeta.discount_amount)}
        </span>
      </div>
    </div>
  );
}
