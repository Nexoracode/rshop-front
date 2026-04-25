"use client";
import PriceBox from "@/components/common/PriceBox";
import React from "react";
import CreatePaymentBtn from "./CreatePaymentBtn";
import { SHOP_NAME } from "@/data/assets";

type Props = {
  total_quantity: number;
  total: number;
  subtotal: number;
  discount_total: number;
  gift_wrapping_cost: number | null;
  shipping_cost: number;
  footer?: React.ReactNode;
  className?: string;
  showRules?: boolean;
  orderID: number;
};

export default function OrderSummeryInfo({
  subtotal,
  total,
  discount_total,
  total_quantity,
  gift_wrapping_cost,
  shipping_cost,
  className,
  showRules = false,
  orderID,
}: Props) {
  const DetailSummery = () => {
    return (
      <>
        <p className="hidden lg:block text-lg font-bold mb-3">جزئیات سفارش</p>

        {/* subtotal */}
        <div className="hidden lg:flex items-center justify-between">
          <p className="text-[13px]">مبلغ کل ({total_quantity})</p>
          <PriceBox
            price={Number(subtotal)}
            className="text-base font-medium"
          />
        </div>

        {/* shipping */}
        <div className="hidden lg:flex items-center justify-between">
          <p className="text-[13px]">هزینه ارسال</p>
          <PriceBox
            price={Number(shipping_cost)}
            className="text-base font-medium"
          />
        </div>

        {/* gift wrapping */}
        {gift_wrapping_cost !== null && (
          <div className="hidden lg:flex items-center justify-between">
            <p className="text-[13px]">بسته‌بندی</p>
            <PriceBox
              price={Number(gift_wrapping_cost)}
              className="text-base font-medium"
            />
          </div>
        )}

        {/* discount */}
        <div className="hidden lg:flex items-center justify-between">
          <p className="text-[13px] text-green-600">تخفیف</p>
          <PriceBox
            price={Number(discount_total)}
            className="text-base font-medium text-green-600"
          />
        </div>

        {/* total */}
        <div className="flex flex-col py-1 lg:py-0 lg:flex-row lg:items-center justify-between lg:border-t lg:pt-4">
          <p className="text-[15px]">قابل پرداخت</p>
          <PriceBox price={Number(total)} className="text-[19px] font-medium" />
        </div>
      </>
    );
  };

  return (
    <div className="fixed lg:relative bottom-0 left-0 right-0 lg:w-[350px] lg:bottom-auto z-50 lg:z-auto">
      <div
        className={`flex justify-between lg:sticky top-2 border-t border-slate-200 rounded-none lg:rounded-xl bg-white lg:border flex-row lg:flex-col lg:gap-4 p-3 md:px-6 ${className}`}
      >
        <DetailSummery />
        <div>
          <CreatePaymentBtn order_id={orderID} />

          {showRules && (
            <p className="text-slate-500 text-xs mt-3">
              با خرید از {SHOP_NAME} قوانین را پذیرفته اید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
