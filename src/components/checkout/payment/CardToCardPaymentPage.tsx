"use client";
import { Card } from "@/components/ui/card";
import { getOrderDetails } from "@/queries/orders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CardToCardPayment from "../CardToCardPayment";

export default function CardToCardPaymentPage() {
  const { order_id } = useParams();

  const { data: order, isPending } = useQuery(
    getOrderDetails(Number(order_id))
  );

  if (isPending) return <div>Loading...</div>;

  if (!order) return <div>Order not found</div>;

  console.log({ order });
  return (
    <Card className="max-w-5xl mx-auto">
      <CardToCardPayment
        date={order.created_at}
        amount={order.total}
        order_id={order.id}
        payment_id={order.payment.id}
        onClose={() => {}}
        open={true}
      />
    </Card>
  );
}
