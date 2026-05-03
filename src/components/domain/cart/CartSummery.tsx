import PriceBox from "@/components/common/PriceBox";
import { Button } from "@/components/ui/button";
import { SHOP_NAME } from "@/data/assets";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/useCheckout";
import React from "react";

export default function CartSummery({
  footer,
  className,
  showRules = false,
}: {
  footer?: React.ReactNode;
  className?: string;
  showRules?: boolean;
}) {
  const { data } = useCart();
  const {
    orderMeta: { promotion_code, discount_amount, promotions },
  } = useCheckout();

  return (
    <div className="fixed lg:relative bottom-0 left-0 right-0 lg:w-[350px] lg:left-0 lg:right-[unset] lg:bottom-[unset] z-50 lg:z-[unset]">
      <div
        className={`flex justify-between lg:sticky top-2 border-t border-slate-200 rounded-none lg:rounded-xl bg-white lg:border flex-row lg:flex-col lg:gap-4 p-3 md:p-6 ${className}`}
      >
        <p className="hidden lg:block text-lg font-bold mb-3">خلاصه سفارش</p>

        <div className="lg:flex hidden items-center justify-between">
          <p className="text-[13px]">مبلغ کل ({data?.total_quantity})</p>
          <PriceBox
            price={Number(data?.subtotal ?? 0)}
            className="text-base font-medium"
          />
        </div>

        <div className="lg:flex hidden items-center justify-between">
          <p className="text-[13px] ">تخفیف محصولات</p>
          <PriceBox
            price={Number(data?.discount_total ?? 0)}
            className="text-base font-medium "
          />
        </div>
        {promotions?.map((promo) => (
          <div
            key={promo.id}
            className="lg:flex hidden items-center justify-between"
          >
            <p className="text-[13px] text-rose-600">{promo.name}</p>
            <PriceBox
              price={Number(promo.discount_amount ?? 0)}
              className="text-base font-medium text-rose-600"
            />
          </div>
        ))}
        {promotions?.length > 0 ? (
          <>
            <div className="lg:flex hidden items-center justify-between">
              <p className="text-[13px] text-green-600">مجموع تخفیف </p>
              <PriceBox
                price={Number((data?.discount_total ?? 0) + discount_amount)}
                className="text-base font-medium text-green-600"
              />
            </div>
          </>
        ) : (
          ""
        )}

        <div className="flex flex-col py-1 lg:py-0 lg:flex-row lg:items-center justify-between lg:border-t lg:pt-4">
          <p className="text-[15px]">قابل پرداخت</p>
          <PriceBox
            price={Number((data?.total ?? 0) - discount_amount)}
            className="text-[19px] font-medium"
          />
        </div>

        <div>
          {footer ? (
            footer
          ) : (
            <Button href="/checkout" className="w-full">
              ادامه خرید
            </Button>
          )}
          {showRules ? (
            <p className="text-slate-500 text-xs mt-3">
              با خرید از {SHOP_NAME} قوانین را پذیرفته اید.
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
