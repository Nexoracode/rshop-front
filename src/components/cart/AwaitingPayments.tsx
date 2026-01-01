"use client";
import { getOrders } from "@/queries/orders";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import AwatingPaymentCard from "./AwatingPaymentCard";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";

export default function AwaitingPayments() {
  const { data, isFetching } = useQuery(getOrders("awaiting-payment"));
  const isMobile = useIsMobile();

  return isFetching ? (
    <Skeleton className="h-16" />
  ) : data && data.length > 0 ? (
    <Card>
      {isMobile ? (
        <Link
          className="flex items-center text-sm py-3"
          href={`/profile/orders`}
        >
          <AlertCircle className="text-warning-600 size-5" />

          <span className="ps-2 flex-1 inline-block">
            {data.length} سفارش در انتظار پرداخت{" "}
          </span>

          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <>
          <div className="border-b pb-2">{`شما ${data.length} سفارش در انتظار پرداخت دارید`}</div>

          {data.map((order) => (
            <AwatingPaymentCard key={order.id} {...order} />
          ))}
        </>
      )}
    </Card>
  ) : null;
}
