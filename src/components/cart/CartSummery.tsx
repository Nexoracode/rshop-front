import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatToman } from "@/lib/utils";
import { getCart } from "@/queries/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CartSummery() {
  const { data } = useQuery(getCart);

  return (
    <div className="fixed md:relative bottom-0 left-0 right-0 md:w-[300px] md:left-0 md:right-[unset] md:bottom-[unset]  z-50 md:z-[unset]">
      <Card className="flex justify-between rounded-none md:rounded-xl !shadow-2xl md:!shadow flex-row-reverse md:flex-col p-4">
        <div className="md:flex hidden justify-between mb-2">
          <p className="text-sm text-muted">
            قیمت کالاها({data?.total_quantity})
          </p>
          <p className="text-base font-semibold">
            {formatToman(data?.subtotal ?? 0)}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <p className="text-xs md:text-sm text-muted">جمع سبد خرید</p>
          <p className="text-sm md:text-base font-semibold">
            {formatToman(data?.total ?? 0)}
          </p>
        </div>
        <div className="md:flex hidden justify-between mb-2">
          <p className="text-sm text-muted">سود شما از خرید</p>
          <p className="text-base font-semibold">
            {formatToman(data?.discount_total ?? 0)}
          </p>
        </div>

        <div>
          <Button href="/checkout" className="w-full md:mt-4">
            ادامه جهت تسویه حساب
          </Button>
        </div>
      </Card>

      <div className="text-sm hidden md:block text-muted mt-2">
        هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالا ها از سبد
        خرید حذف می شوند
      </div>
    </div>
  );
}
