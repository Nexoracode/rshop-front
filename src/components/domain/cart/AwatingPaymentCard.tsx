import { Order } from "@/types/order";
import { AlertCircle } from "lucide-react";
import React from "react";
import { formatToman } from "@/lib/utils/price";
import { formatDurationFa } from "@/lib/utils/date-time";
import { Button } from "@/components/ui/button";

export default function AwatingPaymentCard({
  id,
  total,
  remaining_seconds,
  remaininigOrders,
}: Order & { remaining_seconds: number; remaininigOrders: number }) {
  return (
    <div>
      <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4 mb-4">
        <p className="animate-pulse text-sm">{`شما ${remaininigOrders} سفارش در انتظار پرداخت دارید`}</p>
        <div className="flex text-warning-600">
          <AlertCircle className="size-4" />

          <div className="ps-2 text-[13px]">
            در صورت عدم پرداخت تا {formatDurationFa(remaining_seconds)} دیگر
            سفارش لغو خواهدشد.{" "}
          </div>
        </div>
      </div>
      <div className="flex text-sm items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-[15px]">قابل پرداخت</p>
          <p className="text-[19px] font-medium">
            {formatToman(total, false)}
            <span className="text-xs text-slate-500 pr-1.5">تومان</span>
          </p>
        </div>

        <div className="space-x-3">
          <Button variant={"outline"} href={`/profile/orders/${id}`}>
            جزییات سفارش
          </Button>
          <Button href={`/checkout/payment/${id}`}>پرداخت</Button>
        </div>
      </div>
    </div>
  );
}
