"use client";

import { Card } from "@/components/ui/card";
import { Payment } from "@/types/order";
import SubmitPaymentReceip from "./SubmitPaymentReceip";
import { toPersainDateTime } from "@/lib/utils";
import {
  CardToCardPaymentStatusFa,
  PaymentMethodFa,
  PaymentStatusFa,
} from "@/data/order";
import { Badge } from "@/components/ui/badge";

export function OrderPaymentSection({
  payment,
  order_id,
}: {
  payment: Payment;
  order_id: number;
}) {
  return (
    <Card className="justify-between">
      <h3 className="font-semibold mb-2">اطلاعات پرداخت</h3>
      {payment && (
        <div className="space-y-4">
          <p className="text-sm">
            روش پرداخت: {PaymentMethodFa[payment.payment_method].label}
          </p>
          {payment?.ref_id && (
            <p className="text-sm">کد تراکنش:{payment?.ref_id}</p>
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
            تاریخ پرداخت: <span>{toPersainDateTime(payment.created_at)}</span>
          </p>
        </div>
      )}

      {payment.payment_method === "card_to_card" && (
        <SubmitPaymentReceip
          amount={Number(payment.amount)}
          order_id={order_id}
          payment_id={payment.id}
          paymentInfo={payment}
        />
      )}
    </Card>
  );
}
