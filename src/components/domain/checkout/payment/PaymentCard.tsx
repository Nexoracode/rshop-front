"use client";

import { useQuery } from "@tanstack/react-query";
import OrderSummeryInfo from "./OrderSummeryInfo";
import { getOrderDetails } from "@/queries/profile/order";

export default function PaymentCard({ order_id }: { order_id: number }) {
  const { data } = useQuery(getOrderDetails(Number(order_id)));

  if (!data) {
    return null;
  }

  return (
    <OrderSummeryInfo
      discount_total={+data.discount_total}
      subtotal={+data.subtotal}
      total={+data.total}
      total_quantity={data?.items.reduce((c, i) => i.quantity + c, 0)}
      shipping_cost={data.shipping_cost}
      gift_wrapping_cost={data.gift_wrapping_cost}
      showRules
      orderID={order_id}
      discount_breakdown={data.discount_breakdown}
    />
  );
}
