"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import PaymentMethodSelector from "../PaymentMethod";
import PaymentCard from "./PaymentCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "@/components/common/PageLoader";
import OrderNotPayable from "./OrderNotPayable";
import OrderItems from "./OrderItems";
import { OrderDiscountSection } from "./OrderDiscountSection";
import { getOrderDetails } from "@/queries/profile/order";
import PriceBox from "@/components/common/PriceBox";

export default function PaymentPage() {
  const { order_id } = useParams();
  const { data, isPending } = useQuery(getOrderDetails(Number(order_id)));
  return (
    <div className="space-y-6">
      {isPending ? (
        <PageLoader />
      ) : data ? (
        data.status !== "awaiting_payment" && data.status !== "start_order" ? (
          <OrderNotPayable status={data.status} orderId={data.id} />
        ) : (
          <>
            <div className="flex gap-8">
              <div className="flex-1 space-y-8">
                <div className={`lg:hidden flex flex-col gap-4 md:p-6 rounded-lg md:border`}>
                  <p className="text-lg font-bold mb-3">جزئیات سفارش</p>

                  {/* subtotal */}
                  <div className="flex items-center justify-between">
                    <p className="text-[13px]">
                      مبلغ کل ({data?.items.reduce((c, i) => i.quantity + c, 0)}
                      )
                    </p>
                    <PriceBox
                      price={Number(data.subtotal)}
                      className="text-base font-medium"
                    />
                  </div>

                  {/* shipping */}
                  <div className="flex items-center justify-between">
                    <p className="text-[13px]">هزینه ارسال</p>
                    <PriceBox
                      price={Number(data.shipping_cost)}
                      className="text-base font-medium"
                    />
                  </div>

                  {/* gift wrapping */}
                  {data.gift_wrapping_cost !== null && (
                    <div className="flex items-center justify-between">
                      <p className="text-[13px]">بسته‌بندی</p>
                      <PriceBox
                        price={Number(data.gift_wrapping_cost)}
                        className="text-base font-medium"
                      />
                    </div>
                  )}

                  {/* discount */}
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-green-600">تخفیف</p>
                    <PriceBox
                      price={Number(data.discount_total)}
                      className="text-base font-medium text-green-600"
                    />
                  </div>
                  <PaymentMethodSelector />
                </div>
                <div className="hidden lg:flex flex-col border p-5 rounded-lg">
                  <p className="hidden lg:block text-lg font-bold mb-3">روش پرداخت</p>
                  <PaymentMethodSelector />
                </div>
                <Card className="p-3 md:p-6">
                  <OrderItems items={data.items} />
                </Card>
                {data.promotions?.length ? (
                  <OrderDiscountSection promotions={data.promotions} />
                ) : (
                  ""
                )}
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
