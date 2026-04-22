import { Button } from "@/components/ui/button";
import { SHOP_NAME } from "@/data/assets";
import { formatToman } from "@/lib/utils/price";
import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CartSummery({
  footer,
  className,
}: {
  footer?: React.ReactNode;
  className?: string;
}) {
  const { data } = useQuery(getCart);

  const toman = () => {
    return <span className="text-xs text-slate-500 pr-1.5">تومان</span>;
  };

  return (
    <div className="fixed lg:relative bottom-0 left-0 right-0 lg:w-[350px] lg:left-0 lg:right-[unset] lg:bottom-[unset] z-50 lg:z-[unset]">
      <div
        className={`flex justify-between border-t border-slate-200 rounded-none lg:rounded-xl bg-white lg:border flex-row lg:flex-col lg:gap-4 p-4 lg:p-6 ${className}`}
      >
        {!footer ? (
          <p className="hidden lg:block text-lg font-bold mb-3">خلاصه سفارش</p>
        ) : (
          ""
        )}

        <div className="lg:flex hidden items-center justify-between">
          <p className="text-[13px]">مبلغ کل ({data?.total_quantity})</p>
          <p className="text-base font-medium">
            {formatToman(data?.subtotal ?? 0, false)}
            {toman()}
          </p>
        </div>

        <div className="lg:flex hidden items-center justify-between">
          <p className="text-[13px] text-green-600">تخفیف</p>
          <p className="text-base font-medium text-green-600">
            {formatToman(data?.discount_total ?? 0, false)}
            <span className="text-xs text-green-600 pr-1.5">تومان</span>
          </p>
        </div>

        <div className="flex flex-col py-1 lg:py-0 lg:flex-row lg:items-center justify-between lg:border-t lg:pt-4">
          <p className="text-[15px]">قابل پرداخت</p>
          <p className="text-[19px] font-medium">
            {formatToman(data?.total ?? 0, false)}
            {toman()}
          </p>
        </div>

        {footer ? (
          footer
        ) : (
          <div>
            <Button href="/checkout" className="w-full">
              ادامه خرید
            </Button>
            <p className="text-slate-500 text-xs mt-3">
              با خرید از {SHOP_NAME} قوانین را پذیرفته اید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
