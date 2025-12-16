"use client";

import { Card } from "@/components/ui/card";
import { Payment } from "@/types/order";
import SubmitPaymentReceip from "./SubmitPaymentReceip";

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
      <div className="space-y-4">
        <p className="text-sm">روش پرداخت: {payment?.gateway || "زرین پال"}</p>
        {payment?.ref_id && (
          <p className="text-sm">کد تراکنش: {payment?.ref_id}</p>
        )}
        <p className="text-sm">
          وضعیت پرداخت:{" "}
          <span
            className={
              payment?.status === "paid" ? "text-green-600" : "text-red-500"
            }
          >
            {payment?.status === "paid" ? "پرداخت‌شده" : "ناموفق"}
          </span>
        </p>
      </div>

      <SubmitPaymentReceip
        amount={Number(payment.amount)}
        order_id={order_id}
        payment_id={payment.id}
      />
    </Card>
  );
}
