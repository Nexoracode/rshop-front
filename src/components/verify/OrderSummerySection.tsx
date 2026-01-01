import { formatToman, toPersainDate } from "@/lib/utils";
import React from "react";
import { Card } from "../ui/card";
import InfoRow from "./InfoRow";
import { PaymentGateway } from "@/types/order";
import { PaymentGatewayFa } from "@/data/order";

type Props = {
  order_id: number;
  total: string;
  invoice_date: string;
  ref_id: string;
  gateway: PaymentGateway;
};

export default function OrderSummerySection({
  invoice_date,
  order_id,
  ref_id,
  total,
  gateway,
}: Props) {
  return (
    <Card>
      <div>
        <InfoRow label="شماره سفارش" value={order_id} />
        <InfoRow label="کد پیگیری" value={ref_id} />
        <InfoRow label="تاریخ" value={toPersainDate(invoice_date)} />
        <InfoRow label="مبلغ پرداختی" value={formatToman(Number(total))} />
        <InfoRow label="درگاه پرداخت" value={PaymentGatewayFa[gateway].label} />
      </div>
    </Card>
  );
}
