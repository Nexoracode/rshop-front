"use client";
import OrderItemCard from "./OrderItemCard";
import { OrderInfoSection } from "./OrderInfoSection";
import { OrderPaymentSection } from "./OrderPaymentSection";
import { OrderShippingSection } from "./OrderShippingSection";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/queries/orders";
import PageLoader from "@/components/common/PageLoader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function OrderDetailsPage() {
  const { order_id } = useParams<{ order_id: string }>();
  const { data: orderData, isPending } = useQuery(
    getOrderDetails(Number(order_id))
  );
  return isPending ? (
    <PageLoader />
  ) : orderData ? (
    <div className="space-y-4">
      <Card className="gap-4 ">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Button
              variant={"text-nohover"}
              color="neutral"
              size={"sm"}
              href={`/profile/orders`}
            >
              <ArrowRight />
            </Button>
            <h1 className="text-lg font-semibold">جزئیات سفارش</h1>
          </div>
          {(orderData.status === "delivered" ||
            orderData.status === "preparing") && (
            <Link
              href={`/invoice/${"22"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              مشاهده فاکتور
            </Link>
          )}
        </div>

        <OrderInfoSection order={orderData} />

        <div className="grid md:grid-cols-2 gap-4">
          <OrderShippingSection address={orderData.address} />
          {orderData.payment && (
            <OrderPaymentSection
              order_id={orderData.id}
              payment={orderData.payment}
            />
          )}
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <div className="space-y-3">
          <h3 className="font-semibold mb-2">محصولات خریداری‌شده</h3>
          {orderData?.items.map((item) => (
            <OrderItemCard key={item.id} item={item} />
          ))}
        </div>
      </Card>
    </div>
  ) : (
    <p>سفارش یافت نشد</p>
  );
}
