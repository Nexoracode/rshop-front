"use client";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CardToCardPayment from "../CardToCardPayment";
import { getOrderDetails } from "@/queries/profile/order";
import EmptyState from "@/components/common/EmptyState";

export default function CardToCardPaymentPage() {
  const { order_id } = useParams();

  const { data: order, isPending } = useQuery(
    getOrderDetails(Number(order_id)),
  );  

  if (isPending) return <div>Loading...</div>;

  if (!order) return <EmptyState/>;

  if (!order.payment) return(
    <div className="flex items-center justify-center">
      پرداخت نامعتبر است. لطفا با پشتیبانی تماس بگیرید یا تیکت جدیدی ثبت کنید
      احتمالا مبلغ بیشتر از 200 میلیون است یا ایرادی از سمت ماست.
    </div>
  )

  return (
    <Card className="max-w-5xl mx-auto border-0 sm:border">
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
