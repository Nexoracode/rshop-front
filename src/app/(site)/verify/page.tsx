"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import PageLoader from "@/components/common/PageLoader";
import { useEffect } from "react";

import { verifyPayment } from "@/queries/checkout/payment/verify";
import OrderSummerySection from "@/components/domain/verify/OrderSummerySection";
import ProductsSection from "@/components/domain/verify/ProductsSection";
import AddressSection from "@/components/domain/verify/AddressSection";
import PaymentFailed from "@/components/domain/verify/PaymentFailed";

export default function PaymentVerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const Status = params.get("Status") || "NOk";
  const Authority = params.get("Authority") || null;

  const { mutateAsync, isPending, data } = useMutation(verifyPayment);

  useEffect(() => {
    if (Authority)
      mutateAsync(
        { Authority, Status },
        {
          onSuccess(data) {
            if (data.code === 101) router.push(`/`);
          },
        },
      );
  }, [Authority, mutateAsync, Status, router]);

  if (isPending || !data || data.code == 101) return <PageLoader />;

  if (data.success === false)
    return <PaymentFailed order={data.order} payment={data.payment} />;

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <>
        <div className="w-full max-w-lg space-y-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src={
                data.success ? "/payment-success.svg" : "/payment-failed.svg"
              }
              alt="payment status"
              width={100}
              height={100}
            />
            <h1 className="text-xl font-medium text-success">
              {"پرداخت با موفقیت انجام شد"}
            </h1>
          </div>

          <OrderSummerySection
            invoice_date={data.invoice_date}
            order_id={data.order.id}
            ref_id={data.ref_id}
            total={data.payment.amount}
            gateway={data.payment.gateway}
          />

          <ProductsSection orderItems={data.order.items} />

          {/* آدرس */}

          <AddressSection address={data.order.address} />

          {/* دکمه‌ها */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <>
              <Button
                onClick={() => router.push(`/profile/orders/${data.order.id}`)}
                fullWidth
              >
                مشاهده سفارش
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                fullWidth
              >
                بازگشت به خانه
              </Button>
            </>
          </div>
        </div>
      </>
    </div>
  );
}
