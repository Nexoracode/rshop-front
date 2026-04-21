"use client";

import PriceBox from "@/components/common/PriceBox";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";

export default function CartSummery() {
  const { data: cart } = useCart();
  return (
    <div className="flex items-center justify-between border-t pt-3 px-5">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-600">مبلغ قابل پرداخت</span>
        <span className="font-medium text-lg">
          <PriceBox price={Number(cart?.total)} />
        </span>
      </div>
      <Button href="/cart" variant="fill" className="!py-5.5">
        ثبت سفارش
      </Button>
    </div>
  );
}
