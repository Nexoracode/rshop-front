"use client";
import OrderItemCard from "./OrderItemCard";
import { OrderInfoSection } from "./OrderInfoSection";
import { OrderPaymentSection } from "./OrderPaymentSection";
import { OrderShippingSection } from "./OrderShippingSection";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getOrderDetails } from "@/queries/profile/order";
import PageLoading from "@/components/shared/asset/PageLoading";

export default function OrderDetailsPage() {
  const { order_id } = useParams<{ order_id: string }>();
  const { data: orderData, isPending } = useQuery(
    getOrderDetails(Number(order_id)),
  );

  return isPending ? (
    <PageLoading />
  ) : orderData ? (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Button
              variant={"text-nohover"}
              color="neutral"
              size={"sm"}
              href={`/profile/orders`}
            >
              <ArrowRight className="text-gray-600" />
            </Button>
            <h1 className="text-lg font-medium">جزئیات سفارش</h1>
          </div>
          {(orderData.status === "delivered" ||
            orderData.status === "preparing") && (
            <Button
              href={`/invoice/${orderData.id}`}
              rel="noopener noreferrer"
              variant={"text"}
              size={"sm"}
            >
              مشاهده فاکتور
            </Button>
          )}
        </div>

        <OrderInfoSection order={orderData} />

        <div className="grid md:grid-cols-2 gap-4">
          <OrderShippingSection address={orderData.address} />
          {orderData.payment && (
            <OrderPaymentSection
              order_id={orderData.id}
              payment={orderData.payment}
              date={orderData.created_at}
            />
          )}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 md:p-6">
        <div className="space-y-3">
          <h3 className="font-medium mb-4">محصولات خریداری‌شده</h3>
          <div className="space-y-2">
            {orderData?.items.map((item) => (
              <OrderItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>سفارش یافت نشد</p>
  );
}
