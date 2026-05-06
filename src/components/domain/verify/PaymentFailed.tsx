import React from "react";
import { Payment, VerifyOrder } from "@/types/order";
import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  Clock3,
  CreditCard,
} from "lucide-react";
import PaymentRetryBtn from "./PaymentRetryBtn";
import Image from "@/components/common/Image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toPersianDate } from "@/lib/utils/date-time";

type Props = {
  order: VerifyOrder;
  payment: Payment;
};

function formatAuthority(authority?: string) {
  if (!authority) return "-";
  return authority.replace(/^[sS0]+/, "") || "-";
}

export default function PaymentFailed({ order, payment }: Props) {
  const authority = formatAuthority(payment?.authority);
  const paymentDate = payment?.created_at
    ? toPersianDate(payment.created_at)
    : "-";

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* MAIN CARD */}
        <Card className="rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl bg-danger/10 p-3">
              <Image
                src="/payment-not-allow.png"
                width={70}
                height={70}
                alt="پرداخت ناموفق"
                className="rounded-xl"
              />
            </div>

            <h1 className="mt-4 text-xl sm:text-2xl font-semibold text-danger">
              پرداخت ناموفق بود
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              سفارش{" "}
              <span className="font-medium text-foreground">#{order?.id}</span>{" "}
              ثبت شد اما پرداخت انجام نشد
            </p>
          </div>
        </Card>

        {/* WARNING */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            در صورت کسر مبلغ، حداکثر تا ۷۲ ساعت آینده به حساب شما بازگردانده
            می‌شود.
          </p>
        </div>

        {/* DETAILS (NO HEAVY BOXES 😌) */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              درگاه
            </span>
            <span className="font-medium">اینترنتی</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <ArrowLeftRight className="w-4 h-4" />
              کد پیگیری
            </span>
            <span className="font-mono text-xs sm:text-sm">{authority}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="w-4 h-4" />
              تاریخ
            </span>
            <span>{paymentDate}</span>
          </div>
        </div>

        <div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <PaymentRetryBtn order_id={order.id} />

            <Button
              href={`/checkout/payment/${order.id}`}
              variant="outline"
              className="w-full"
            >
              تغییر روش پرداخت
            </Button>
          </div>

          <div className="flex mt-3 justify-center">
            <Button
              startIcon={<ArrowRight size={18} />}
              fullWidth
              variant={"text"}
              href={"/"}
            >
              بازگشت به فروشگاه
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
