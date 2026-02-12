import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import { PaymentMode } from "./types";
import { toPersianDateTime } from "@/lib/utils/date-time";

type Props = {
  order_id: number;
  later: boolean;
  paymentMode: PaymentMode;
  date: string;
};

export default function PaymentSuccess({
  order_id,
  later,
  paymentMode,
  date,
}: Props) {
  return (
    <div className="flex gap-4 flex-col items-center justify-center mb-2">
      <div className="rounded-full animate-pulse bg-emerald-50 p-2">
        <CheckCircle2 className="w-24 h-24 text-success" />
      </div>
      {paymentMode === "later" ? (
        <>
          <div className="text-success-700 font-semibold text-lg">
            ثبت سفارش با موفقیت انجام شد.
          </div>

          <div className="text-center text-muted leading-8">
            شما تا{" "}
            {toPersianDateTime(
              new Date(Date.parse(date) + 3600 * 1000 * 4).toISOString(),
            )}{" "}
            جهت بارگزاری رسید پرداخت فرصت دارید
            <br />
            در صورت عدم بارگزاری رسید پرداخت سفارش شما به صورت خودکار منقضی می
            گردد
          </div>
        </>
      ) : (
        <>
          <div className="text-success-700 font-semibold text-lg">
            ثبت رسید پرداخت با موفقیت انجام شد.
          </div>

          <div className="text-center text-muted leading-8">
            پس از تأیید رسید پرداخت، سفارش شما تکمیل شده و فرایند آماده‌سازی و
            ارسال آغاز می‌شود.
          </div>
        </>
      )}

      {later ? (
        <div className="flex w-full gap-2">
          <Button
            variant={"outline"}
            fullWidth
            href={`/profile/orders/${order_id}`}
          >
            فهمیدم
          </Button>
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <Button
            variant={"outline"}
            fullWidth
            href={`/profile/orders/${order_id}`}
          >
            مشاهده سفارش
          </Button>
          <Button fullWidth href={"/"}>
            رفتن به فروشگاه
          </Button>
        </div>
      )}
    </div>
  );
}
