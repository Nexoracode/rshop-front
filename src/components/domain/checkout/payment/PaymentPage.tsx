"use client";

import React from "react";
import PaymentMethodSelector from "../PaymentMethod";
import PaymentCard from "./PaymentCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import OrderNotPayable from "./OrderNotPayable";
import OrderItems from "./OrderItems";
import { OrderDiscountSection } from "./OrderDiscountSection";
import { getOrderDetails } from "@/queries/profile/order";
import PriceBox from "@/components/common/PriceBox";
import { Skeleton, Skeletons } from "@/components/ui/skeleton";

function PaymentPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Payment method skeleton (matches real UI cards) */}
          <div className="lg:hidden space-y-3">
            <Skeleton className="w-[120px] h-[20px]" />

            <div className="grid gap-3">
              <div className="flex items-center gap-3 border rounded-lg p-3 sm:p-5">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-[160px] h-[14px]" />
                  <Skeleton className="w-[220px] h-[12px]" />
                </div>
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>

              <div className="flex items-center gap-3 border rounded-lg p-3 sm:p-5">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-[140px] h-[14px]" />
                  <Skeleton className="w-[200px] h-[12px]" />
                </div>
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
            </div>
          </div>

          {/* Desktop payment method skeleton */}
          <div className="hidden lg:flex flex-col border p-5 rounded-lg space-y-4">
            <Skeleton className="w-[120px] h-[20px]" />

            <div className="space-y-3">
              <div className="flex items-center gap-3 border rounded-lg p-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-[180px] h-[14px]" />
                  <Skeleton className="w-[260px] h-[12px]" />
                </div>
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>

              <div className="flex items-center gap-3 border rounded-lg p-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-[160px] h-[14px]" />
                  <Skeleton className="w-[240px] h-[12px]" />
                </div>
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
            </div>
          </div>

          {/* Promotions skeleton */}
          <div className="space-y-3">
            <div className="border rounded-lg p-4 sm:p-6 space-y-3">
              <Skeleton className="w-[160px] h-[14px]" />
              <Skeletons count={3} className="w-full h-[12px]" />
            </div>
          </div>

          {/* Order items skeleton (matches real OrderItems UI) */}
          <div className="sm:border rounded-lg sm:p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-b last:border-0 pb-4 last:pb-0 space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* left */}
                  <div className="flex gap-4">
                    <Skeleton className="w-[100px] h-[100px] rounded-lg shrink-0" />

                    <div className="flex flex-col gap-3">
                      <Skeleton className="w-[180px] h-[16px]" />

                      <div className="flex gap-2 items-center">
                        <Skeleton className="w-[60px] h-[12px]" />
                        <Skeleton className="w-[60px] h-[12px]" />
                        <Skeleton className="w-[60px] h-[12px]" />
                      </div>
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col sm:items-end gap-3">
                    <Skeleton className="w-[120px] h-[14px]" />
                    <Skeleton className="w-[160px] h-[18px]" />
                    <Skeleton className="w-[60px] h-[14px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment card skeleton */}
        <div className="lg:w-[350px] shrink-0">
          <div className="flex flex-col justify-between sm:border rounded-lg p-2 sm:p-5 space-y-5 lg:h-[397px]">
            <Skeleton className="w-[120px] h-[20px]" />

            <div className="space-y-8">
              <div className="flex justify-between">
                <Skeleton className="w-[120px] h-[12px]" />
                <Skeleton className="w-[80px] h-[16px]" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-[100px] h-[12px]" />
                <Skeleton className="w-[80px] h-[16px]" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-[100px] h-[12px]" />
                <Skeleton className="w-[80px] h-[16px]" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-[80px] h-[12px]" />
                <Skeleton className="w-[80px] h-[16px]" />
              </div>
            </div>

            <Skeleton className="w-full h-[52px] rounded-xl hidden lg:flex" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const { order_id } = useParams();
  const { data, isPending } = useQuery(getOrderDetails(Number(order_id)));

  if (isPending || !data) {
    return <PaymentPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {data ? (
        data.status !== "awaiting_payment" && data.status !== "start_order" ? (
          <OrderNotPayable status={data.status} orderId={data.id} />
        ) : (
          <>
            <div className="flex gap-8">
              <div className="flex-1 space-y-8">
                <div
                  className={`lg:hidden flex flex-col gap-4 md:p-6 rounded-lg md:border`}
                >
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
                  <div className="flex items-center justify-between border-t pt-2">
                    <p className="text-[13px] ">تخفیف محصولات</p>
                    <PriceBox
                      price={Number(
                        data.discount_breakdown.product_discounts.total,
                      )}
                      className="text-base font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-rose-600">
                      تخفیف شگفت انگیز
                    </p>
                    <PriceBox
                      price={Number(
                        data.discount_breakdown.promotion_discounts.total,
                      )}
                      className="text-base font-medium text-rose-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-green-600">مجموع تخفیف</p>
                    <PriceBox
                      price={Number(
                        data.discount_breakdown.summary.grand_total_discount,
                      )}
                      className="text-base font-medium text-green-600"
                    />
                  </div>
                  <PaymentMethodSelector />
                </div>
                <div className="hidden lg:flex flex-col border p-5 rounded-lg">
                  <p className="hidden lg:block text-lg font-bold mb-3">
                    روش پرداخت
                  </p>
                  <PaymentMethodSelector />
                </div>
                <div className="sm:border border-slate-200 rounded-lg sm:p-6 h-fit">
                  <OrderItems items={data.items} />
                </div>
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
