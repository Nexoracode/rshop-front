"use client";

import { useState } from "react";
import { OrdersTabs } from "./OrdersTabs";
import { OrderCard } from "./OrderCard";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/queries/orders";
import { ListLayout } from "@/components/common/ListLayout";
import { Skeletons } from "@/components/ui/skeleton";
import { Order, StatusOrder } from "@/types/order";

export default function OrdersPage() {
  const [status, setStatus] = useState<StatusOrder>("delivered");

  const { data, isFetching } = useQuery(getOrders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold mb-2">سفارش‌های من</h1>
        <p className="text-sm text-muted-foreground">
          در این بخش می‌توانید وضعیت سفارش‌های خود را مشاهده کنید.
        </p>
      </div>

      <OrdersTabs value={status} onChange={setStatus} />

      <ListLayout<Order>
        items={data ?? []}
        renderItem={(order) => <OrderCard order={order} />}
        skeleton={<Skeletons className="h-24" count={3} />}
        loading={isFetching}
        className="flex flex-col gap-2"
      />
    </div>
  );
}
