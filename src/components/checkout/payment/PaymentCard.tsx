"use client";

import { formatToman } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Responsive from "@/components/common/Responsive";
import CreatePaymentBtn from "./CreatePaymentBtn";
import { getOrderDetails } from "@/queries/orders";
import OrderSummeryInfo from "./OrderSummeryInfo";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentCard({ order_id }: { order_id: number }) {
  const { data } = useQuery(getOrderDetails(Number(order_id)));
  return (
    <Card className="p-3  fixed md:!sticky md:top-24 bottom-0 left-0 right-0 md:w-[20rem] md:bg-transparent z-50 md:z-[unset] rounded-none md:rounded-lg">
      <div className="md:space-y-3 space-y-1">
        <Responsive visible="desktop">
          {data ? (
            <OrderSummeryInfo
              discount_total={+data.discount_total}
              subtotal={+data.subtotal}
              total={+data.total}
              total_quantity={data?.items.reduce((c, i) => i.quantity + c, 0)}
              shipping_cost={data.shipping_cost}
              gift_wrapping_cost={data.gift_wrapping_cost}
            />
          ) : (
            <Skeleton />
          )}
        </Responsive>
        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-1">
            <CreatePaymentBtn order_id={order_id} />
          </div>
          <Responsive visible="mobile">
            <div className="flex md:hidden items-end flex-col  justify-between">
              <span className="text-xs text-muted">مبلغ قابل پرداخت</span>
              <span className="text-primary text-lg font-semibold">
                {formatToman(Number(data?.total ?? 0))}
              </span>
            </div>
          </Responsive>
        </div>
      </div>
    </Card>
  );
}
