"use client";
import PriceBox from "@/components/common/PriceBox";
import React from "react";

type Props = {
  total_quantity: number;
  total: number;
  subtotal: number;
  discount_total: number;
  gift_wrapping_cost: number;
  shipping_cost: number;
};

export default function OrderSummeryInfo({
  subtotal,
  total,
  discount_total,
  total_quantity,
  gift_wrapping_cost,
  shipping_cost,
}: Props) {
  return (
    <div className="space-y-2 pt-4">
      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm text-muted-light">
          جمع کل ({total_quantity} کالا)
        </span>
        <PriceBox price={Number(subtotal)} className="font-medium" />
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm text-muted-light">هزینه ارسال </span>
        <PriceBox price={Number(shipping_cost)} className="font-medium" />
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm text-muted-light">هزینه بسته بندی</span>
        <PriceBox price={Number(gift_wrapping_cost)} className="font-medium" />
      </div>

      <div className="flex justify-between text-muted-foreground">
        <span className="text-sm text-muted-light">سود شما از این خرید</span>
        <span className="text-success">
          {" "}
          <PriceBox
            price={Number(discount_total)}
            className="font-medium text-danger-500"
          />{" "}
        </span>
      </div>

      <div className=" flex  justify-between text-base font-bold pt-2 border-t border-border">
        <span className="text-muted">مبلغ قابل پرداخت</span>
        <PriceBox
          price={Number(total)}
          className="text-primary md:text-lg"
        />{" "}
      </div>
    </div>
  );
}
