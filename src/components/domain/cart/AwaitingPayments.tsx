"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AwatingPaymentCard from "./AwatingPaymentCard";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { getAwaitingOrders } from "@/queries/profile/order";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRemainingSeconds } from "@/lib/utils/date-time";

export default function AwaitingPayments() {
  const { data, isFetching } = useQuery(getAwaitingOrders);
  const isMobile = useIsMobile();

  if (isFetching) return <Skeleton className="h-16" />;

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
          className="flex items-center text-sm py-3"
          href={`/profile/orders`}
        >
          <AlertCircle className="text-warning-600 size-5" />

          <span className="ps-2 flex-1 inline-block">
            {remaininigOrders.length} سفارش در انتظار پرداخت{" "}
          </span>

          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <>
          <div className="border-b pb-2">{`شما ${remaininigOrders.length} سفارش در انتظار پرداخت دارید`}</div>

          {remaininigOrders.map((order) => (
            <AwatingPaymentCard key={order.id} {...order} />
          ))}
        </>
      )}
    </Card>
  ) : null;
}
