"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AwatingPaymentCard from "./AwatingPaymentCard";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "@/components/shared/Link";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { getAwaitingOrders } from "@/queries/profile/order";
import { Card } from "@/components/ui/card";
import { getRemainingSeconds } from "@/lib/utils/date-time";

export default function AwaitingPayments() {
  const { data, isFetching } = useQuery(getAwaitingOrders);
  const isMobile = useIsMobile();

  if (isFetching || !data) return null;

  const remaininigOrders =
    data?.items
      .map((order) => ({
        ...order,
        remaining_seconds: getRemainingSeconds(
          order.updated_at,
          data.reservation_order,
        ),
      }))
      .filter((order) => order.remaining_seconds > 0) || [];
  return remaininigOrders.length > 0 ? (
    <Card>
      {isMobile ? (
        <Link
          className="flex items-center justify-between text-sm p-3"
          href={`/profile/orders`}
        >
          <div className="flex items-center gap-1.5">
            <AlertCircle className="text-warning-600 size-4" />

            <span>{remaininigOrders.length} سفارش در انتظار پرداخت </span>
          </div>

          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <>
          <p className="animate-pulse text-sm">{`شما ${remaininigOrders.length} سفارش در انتظار پرداخت دارید`}</p>

          {remaininigOrders.map((order) => (
            <AwatingPaymentCard
              key={order.id}
              {...order}
              remaininigOrders={+remaininigOrders.length}
            />
          ))}
        </>
      )}
    </Card>
  ) : null;
}
