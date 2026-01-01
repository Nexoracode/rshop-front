import {
  formatDurationFa,
  formatToman,
  getRemainingSeconds,
} from "@/lib/utils";
import { Order } from "@/types/order";
import { AlertCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function AwatingPaymentCard({ id, updated_at, total }: Order) {
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
          سفارش شما در صورت عدم پرداخت تا{" "}
          {formatDurationFa(getRemainingSeconds(updated_at, 15))} دیگر لغو
          خواهدشد.{" "}
        </div>
      </div>
      <div className="space-x-3">
        <Button variant={"outline"} href={`/profile/order/${id}`}>
          جزییات سفارش
        </Button>
        <Button href={`/checkout/payment/${id}`}>پرداخت</Button>
      </div>
    </div>
  );
}
