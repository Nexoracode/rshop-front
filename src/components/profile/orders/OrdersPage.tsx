"use client";

import { useState } from "react";
import { OrdersTabs } from "./OrdersTabs";
import { OrderCard } from "./OrderCard";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/queries/orders";
import { ListLayout } from "@/components/common/ListLayout";
import { Skeletons } from "@/components/ui/skeleton";
import { Order, StatusOrder } from "@/types/order";

const orderStatus: Record<
  string,
  { label: string; status: Array<StatusOrder> }
> = {
  cancell: {
    label: "لغو شده",
    status: ["expired", "not_delivered", "payment_failed"],
  },
  reject: { label: "مرجوع شده", status: ["refunded", "rejected"] },
  deliver: { label: "تحویل شده", status: ["delivered"] },
  current: {
    label: "جاری",
    status: [
      "awaiting_payment",
      "preparing",
      "shipping",
      "payment_confirmation_pending",
      "awaiting_payment",
    ],
  },
};
export default function OrdersPage() {
  const [status, setStatus] = useState<string>("current");

  const { data, isFetching } = useQuery(getOrders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold mb-2">سفارش‌های من</h1>
        <p className="text-sm text-muted-foreground">
          در این بخش می‌توانید وضعیت سفارش‌های خود را مشاهده کنید.
        </p>
      </div>

      <OrdersTabs tabs={orderStatus} value={status} onChange={setStatus} />

      <ListLayout<Order>
        items={
          data?.filter((item) =>
            orderStatus[status].status.includes(item.status)
          ) ?? []
        }
        renderItem={(order) => <OrderCard order={order} />}
        skeleton={<Skeletons className="h-24" count={3} />}
        loading={isFetching}
        className="flex flex-col gap-2"
      />
    </div>
  );
}
