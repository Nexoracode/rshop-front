import { Button } from "@/components/ui/button";
import { SHOP_NAME } from "@/data/assets";
import { formatToman } from "@/lib/utils/price";
import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CartSummery() {
  const { data } = useQuery(getCart);

  const toman = () => {
    return <span className="text-xs text-slate-500 pr-1.5">تومان</span>;
  };

  return (
    <div className="fixed md:relative bottom-0 left-0 right-0 md:w-[350px] md:left-0 md:right-[unset] md:bottom-[unset]  z-50 md:z-[unset]">
      <div className="flex justify-between border-t rounded-none md:rounded-xl md:border flex-row-reverse md:flex-col md:gap-4 p-6">
        <p className="hidden md:block text-lg font-bold mb-3">خلاصه سفارش</p>

        <div className="md:flex hidden items-center justify-between">
          <p className="text-[13px]">مبلغ کل</p>
          <p className="text-base font-medium">
            {formatToman(data?.subtotal ?? 0, false)}
            {toman()}
          </p>
        </div>

        <div className="md:flex hidden items-center justify-between">
          <p className="text-[13px] text-green-600">تخفیف</p>
          <p className="text-base font-medium text-green-600">
            {formatToman(data?.discount_total ?? 0, false)}
            <span className="text-xs text-green-600 pr-1.5">تومان</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between md:border-t md:pt-4">
          <p className="text-[15px]">قابل پرداخت</p>
          <p className="text-sm md:text-[19px] font-medium">
            {formatToman(data?.total ?? 0, false)}
            {toman()}
          </p>
        </div>

        <div>
          <div>
            <Button href="/checkout" className="w-full">
              ادامه خرید
            </Button>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            با خرید از {SHOP_NAME} قوانین را پذیرفته اید.
          </p>
        </div>
      </div>
    </div>
  );
}
