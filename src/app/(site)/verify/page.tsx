"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "@/queries/payment";
import PageLoader from "@/components/common/PageLoader";
import { useEffect } from "react";
import { formatToman, toPersainDate } from "@/lib/utils";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";

export default function PaymentVerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const Status = params.get("Status") || "NOk";
  const Authority = params.get("Authority") || null;

  const { mutate, isPending, data } = useMutation(verifyPayment);

  useEffect(() => {
    if (Authority) mutate({ Authority, Status });
  }, [Authority, mutate, Status]);

  const address = {
    recipient_name: "محمد حسینی",
    city: "تهران",
    address_line: "خیابان آزادی، خیابان حبیب‌اله، پلاک 24، واحد 2",
  };

  const paymentInfo = {
    gateway: "زرین‌پال",
    method: "پرداخت اینترنتی",
    card_mask: "6037-****-****-4321",
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      {/* تصویر */}

      {isPending || !data ? (
        <PageLoader />
      ) : (
        <>
          <div className="w-48 mb-4">
            <Image
              src={
                data.success ? "/payment-success.svg" : "/payment-failed.svg"
              }
              alt="payment status"
              width={200}
              height={200}
              className="w-full h-auto object-contain mx-auto"
            />
          </div>

          {/* کارت خلاصه */}
          <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 p-6 space-y-6">
            {/* عنوان */}
            <div className="flex items-center justify-center gap-3">
              {data.success ? (
                <CheckCircle2 className="text-green-500 w-8 h-8" />
              ) : (
                <XCircle className="text-red-500 w-8 h-8" />
              )}
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {data.success
                  ? "پرداخت با موفقیت انجام شد"
                  : "پرداخت ناموفق بود"}
              </h1>
            </div>

            {/* خلاصه سفارش */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>شماره سفارش: {data?.order.id}</p>
              <p>تاریخ: {toPersainDate(data?.order.created_at ?? "")}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100 mt-1">
                مبلغ پرداختی: {formatToman(Number(data?.order.total ?? 0))}{" "}
                تومان
              </p>
            </div>

            {/* اطلاعات ۳ بخش در یک grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {/* محصولات */}
              <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  محصولات
                </h3>
                <div className="space-y-2">
                  {data?.order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Image
                        src={item.product.image ?? PRODUCT_PLACEHOLDER}
                        alt={item.product.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="text-gray-900 dark:text-gray-100 text-sm">
                          {item.product.name}
                        </p>
                        <div className="flex gap-1">
                          {item.variant?.attributes?.map((i) => (
                            <p key={i.id} className="text-sm">
                              <span className="text-muted font-light">
                                {i.attribute.name}
                              </span>{" "}
                              :{" "}
                              <span className="font-semibold text-neutral-800">
                                {i.value.value}
                              </span>
                            </p>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs">
                          {item.line_total} تومان
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* آدرس */}
              <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  آدرس ارسال
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {address.recipient_name}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {address.address_line}, {address.city}
                </p>
              </div>

              {/* پرداخت */}
              <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  اطلاعات پرداخت
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {paymentInfo.gateway}
                </p>
                <p className="text-gray-500 text-xs">{paymentInfo.method}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {paymentInfo.card_mask}
                </p>
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {data.success ? (
                <>
                  <Button
                    onClick={() => router.push("/orders")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    مشاهده سفارش
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="flex-1"
                  >
                    بازگشت به خانه
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/checkout")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    تلاش مجدد
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="flex-1"
                  >
                    بازگشت
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
