"use client";
import SectionTitle from "@/components/common/SectionTitle";
import { Card } from "@/components/ui/card";
import React from "react";
import PaymentMethodSelector from "../PaymentMethod";
import PaymentCard from "./PaymentCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/queries/orders";
import PageLoader from "@/components/common/PageLoader";
import OrderNotPayable from "./OrderNotPayable";
import Responsive from "@/components/common/Responsive";
import OrderItems from "./OrderItems";
import { OrderDiscountSection } from "./OrderDiscountSection";
import OrderSummeryInfo from "./OrderSummeryInfo";

export default function PaymentPage() {
  const { order_id } = useParams();
  const { data, isPending } = useQuery(getOrderDetails(Number(order_id)));
  return (
    <div className="min-h-screen space-y-5">
      {isPending ? (
        <PageLoader />
      ) : data ? (
        data.status !== "awaiting_payment" && data.status !== "start_order" ? (
          <OrderNotPayable status={data.status} orderId={data.id} />
        ) : (
          <>
            <SectionTitle title="پرداخت" />
            <div className="flex items-start gap-5">
              <div className="flex-1 space-y-5">
                <Card className="p-3 bg-transparent">
                  <PaymentMethodSelector />
                </Card>
                <Card className="p-3 bg-transparent">
                  <OrderItems items={data.items} />
                </Card>
                <OrderDiscountSection promotions={data.promotions} />
                <Responsive visible="mobile">
                  <Card>
                    <div className="px-4">
                      <OrderSummeryInfo
                        {...data}
                        total_quantity={data.items.reduce(
                          (c, i) => i.quantity + c,
                          0
                        )}
                      />
                    </div>
                  </Card>
                </Responsive>
              </div>
              <PaymentCard order_id={data.id} />
            </div>
          </>
        )
      ) : (
        <p>سفارش یافت نشد</p>
      )}
    </div>
  );
}
