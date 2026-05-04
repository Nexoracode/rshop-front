"use client";

import { Card } from "@/components/ui/card";
import { Order, Payment } from "@/types/order";
import SubmitPaymentReceip from "./SubmitPaymentReceip";
import {
  CardToCardPaymentStatusFa,
  PaymentMethodFa,
  PaymentStatusFa,
} from "@/data/order";
import { Badge } from "@/components/ui/badge";
import { toPersianDateTime } from "@/lib/utils/date-time";
import { useMemo } from "react";

export function OrderPaymentSection({
  payment,
  order_id,
  date,
  orderStatus,
}: {
  payment: Payment;
  order_id: number;
  date: string;
  orderStatus: Order["status"];
}) {
  const paymentReceip = useMemo(() => {
    if (payment.payment_method !== "card_to_card") return null;

    if (orderStatus === "expired") return null;

    return (
      <SubmitPaymentReceip
        date={date}
        amount={Number(payment.amount)}
        order_id={order_id}
        payment_id={payment.id}
        paymentInfo={payment}
      />
    );
  }, [payment, orderStatus]);
  return (
    <Card className="">
      <h3 className="font-medium mb-2">اطلاعات پرداخت</h3>
      {payment && (
        <div className="space-y-4">
          <p className="text-sm">
            روش پرداخت: {PaymentMethodFa[payment.payment_method].label}
          </p>
          {payment?.ref_id && (
            <p className="text-sm">کد پیگیری:{payment?.ref_id}</p>
          )}
          <p className="text-sm">
            وضعیت پرداخت:{" "}
            <Badge
              variant={
                payment.payment_method === "card_to_card" &&
                payment.card_to_card_status
                  ? CardToCardPaymentStatusFa[payment.card_to_card_status].color
                  : PaymentStatusFa[payment.status].color
              }
            >
              {payment.payment_method === "card_to_card" &&
              payment.card_to_card_status
                ? CardToCardPaymentStatusFa[payment.card_to_card_status].label
                : PaymentStatusFa[payment.status].label}
            </Badge>
          </p>
          <p className="text-sm">
            تاریخ پرداخت: <span>{toPersianDateTime(payment.created_at)}</span>
          </p>
        </div>
      )}

      {paymentReceip}
    </Card>
  );
}
