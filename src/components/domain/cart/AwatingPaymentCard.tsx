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
}: Order & { remaining_seconds: number }) {
  return (
    <div className="flex text-sm items-center justify-between border-b last:border-b-0">
      <div>{id}</div>

      <div>
        <span className="text-muted-light">قابل پرداخت</span>{" "}
        <span className="font-semibold">{formatToman(total)}</span>
      </div>

      <div className="flex text-warning-600">
        <AlertCircle />

        <div className="ps-2">
          سفارش شما در صورت عدم پرداخت تا {formatDurationFa(remaining_seconds)}{" "}
          دیگر لغو خواهدشد.{" "}
        </div>
      </div>
      <div className="space-x-3">
        <Button variant={"outline"} href={`/profile/orders/${id}`}>
          جزییات سفارش
        </Button>
        <Button href={`/checkout/payment/${id}`}>پرداخت</Button>
      </div>
    </div>
  );
}
