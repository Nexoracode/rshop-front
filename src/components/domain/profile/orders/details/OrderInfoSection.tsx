"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { statusColor, statusLabel } from "@/data/order";
import { toPersianDate } from "@/lib/utils/date-time";
import { formatToman } from "@/lib/utils/price";
import { Order } from "@/types/order";

export function OrderInfoSection({ order }: { order: Order }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          شماره سفارش: <span className="font-semibold">{order.id}</span>
        </p>
        <Badge variant={statusColor[order.status]}>
          {statusLabel[order.status]}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          کد رهگیری پستی:{" "}
          <span className="font-semibold">
            {order.payment_gateway_ref ?? "پس از ارسال مرسوله قابل مشاهده است."}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          تاریخ ثبت:{" "}
          <span className="font-semibold">
            {toPersianDate(order.created_at)}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          مبلغ کل:{" "}
          <span className="font-semibold">{formatToman(+order.total)}</span>
        </p>
      </div>
    </Card>
  );
}
