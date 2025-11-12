"use client";

import { Card } from "@/components/ui/card";
import { Payment } from "@/types/order";

export function OrderPaymentSection({ payment }: { payment: Payment }) {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-semibold mb-2">اطلاعات پرداخت</h3>
      <p className="text-sm">روش پرداخت: {payment?.gateway || "زرین پال"}</p>
      {payment.ref_id && (
        <p className="text-sm">کد تراکنش: {payment?.ref_id}</p>
      )}
      <p className="text-sm">
        وضعیت پرداخت:{" "}
        <span
          className={
            payment.status === "paid" ? "text-green-600" : "text-red-500"
          }
        >
          {payment.status === "paid" ? "پرداخت‌شده" : "ناموفق"}
        </span>
      </p>
    </Card>
  );
}
