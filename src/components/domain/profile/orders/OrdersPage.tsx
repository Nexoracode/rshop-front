"use client";

import { useState } from "react";
import { OrdersTabs } from "./OrdersTabs";
import { OrderCard } from "./OrderCard";
import { useQuery } from "@tanstack/react-query";
import { ListLayout } from "@/components/common/ListLayout";
import { Skeletons } from "@/components/ui/skeleton";
import { Order, ProfileOrderStatus } from "@/types/order";
import { getOrders } from "@/queries/profile/order";
import ProfileSectionBox from "../ProfileSectionBox";

const orderStatus: Record<ProfileOrderStatus, { label: string }> = {
  cancelled: {
    label: "لغو شده",
  },
  returned: { label: "مرجوع شده" },
  completed: { label: "ارسال شده" },
  processing: {
    label: "جاری",
  },
};
export default function OrdersPage() {
  const [status, setStatus] = useState<ProfileOrderStatus>("processing");

  const { data, isFetching } = useQuery(getOrders(status));

  return (
    <ProfileSectionBox title="تاریخچه سفارشات" className="min-h-fit" childrenClassName="space-y-6">
      <OrdersTabs tabs={orderStatus} value={status} onChange={setStatus} />

      <ListLayout<Order>
        items={data?.items ?? []}
        renderItem={(order) => <OrderCard key={order.id} order={order} />}
        skeleton={<Skeletons className="h-24" count={3} />}
        loading={isFetching}
        className="flex flex-col gap-2"
      />
    </ProfileSectionBox>
  );
}
