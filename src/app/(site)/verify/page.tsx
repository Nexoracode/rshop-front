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

  /* const data: {
    order: Order;
    payment: Payment;
    message: string;
    status: string;
    success: boolean;
  } = {
    success: true,
    message: "پرداخت با موفقیت انجام شد.",
    ref_id: 14981301,
    invoice_date: "2025-12-16T10:07:48.621Z",
    order: {
      id: 3,
      address_id: 1,
      status: "preparing",
      subtotal: "500000",
      discount_total: "50000",
      total: "530000",
      payment_gateway_ref: null,
      promotion_discount_amount: "0.00",
      promotion_details: [],
      shipping_cost: "80000.00",
      promotion_code: null,
      gift_wrapping_id: null,
      gift_wrapping_cost: "0",
      gift_message: null,
      is_gift: false,
      manual_discount_type: null,
      manual_discount_value: 0,
      manual_discount_applied: 0,
      is_manual: false,
      note: "",
      created_at: "2025-12-16T10:07:38.316Z",
      updated_at: "2025-12-16T10:07:48.000Z",
      user: {
        id: 1,
        first_name: null,
        last_name: null,
        phone: "09356867218",
        is_phone_verified: true,
        email: null,
        is_active: true,
        last_login_at: null,
        avatar_url: null,
        media_id: null,
        created_at: "2025-12-16T04:50:19.134Z",
        updated_at: "2025-12-16T06:41:37.000Z",
      },
      address: {
        id: 1,
        city: "باجگیران",
        province: "خراسان رضوی",
        plaque: "1",
        unit: "1",
        address_line: "dfsdfsdf",
        address_name: "منزل",
        recipient_name: "null null",
        recipient_phone: "09356867218",
        is_self: true,
        postal_code: "2131231231",
        is_primary: true,
        user_id: 1,
        created_at: "2025-12-16T06:46:20.337Z",
        updated_at: "2025-12-16T06:46:20.337Z",
      },
      items: [
        {
          id: 6,
          order_id: 3,
          product_id: 1,
          variant_id: null,
          quantity: 1,
          unit_price: "500000",
          discount: "50000",
          line_total: "450000",
          product: {
            id: 1,
            name: "قرآنکریم رقعی مخصوص حفظ",
            price: "500000",
            stock: 20,
            is_same_day_shipping: false,
            requires_preparation: false,
            preparation_days: null,
            is_limited_stock: false,
            discount_amount: 0,
            discount_percent: 10,
            is_featured: true,
            weight: 20,
            weight_unit: "گرم",
            description: "<p>sdfdfsdfsf</p>",
            is_visible: true,
            order_limit: 0,
            category_id: 3,
            sku: "rsp258",
            media_pinned_id: 9,
            helper_id: null,
            brand_id: 3,
            created_at: "2025-12-16T06:44:15.529Z",
            is_active: true,
            updated_at: "2025-12-16T06:45:16.000Z",
            media_pinned: {
              id: 9,
              url: "https://dl.poshtybanman.ir/Rshop/product/file-1765867438459-342.webp",
              type: "image",
              alt_text: null,
              product_id: 1,
              category_id: null,
              user_id: null,
              created_at: "2025-12-16T06:43:59.321Z",
            },
            medias: [
              {
                id: 9,
                url: "https://dl.poshtybanman.ir/Rshop/product/file-1765867438459-342.webp",
                type: "image",
                alt_text: null,
                product_id: 1,
                category_id: null,
                user_id: null,
                created_at: "2025-12-16T06:43:59.321Z",
              },
            ],
          },
          variant: null,
        },
      ],
      gift_wrapping: null,
    },
    payment: {
      id: 4,
      order_id: 3,
      amount: "530000.00",
      authority: "S000000000000000000000000000000pg2yn",
      ref_id: 14981301,
      status: "success",
      message: "پرداخت با موفقیت تایید شد.",
      gateway: "zarinpal",
      payment_method: "online",
      receipt_image_id: null,
      card_to_card_status: null,
      sender_card_number: null,
      tracking_code: null,
      deposit_date: null,
      admin_note: null,
      reviewed_by_id: null,
      reviewed_at: null,
      created_at: "2025-12-16T10:07:41.544Z",
      updated_at: "2025-12-16T10:07:48.000Z",
      order: {
        id: 3,
        address_id: 1,
        status: "payment_confirmation_pending",
        subtotal: "500000",
        discount_total: "50000",
        total: "530000",
        payment_gateway_ref: null,
        promotion_discount_amount: "0.00",
        promotion_details: [],
        shipping_cost: "80000.00",
        promotion_code: null,
        gift_wrapping_id: null,
        gift_wrapping_cost: "0",
        gift_message: null,
        is_gift: false,
        manual_discount_type: null,
        manual_discount_value: 0,
        manual_discount_applied: 0,
        is_manual: false,
        note: "",
        created_at: "2025-12-16T10:07:38.316Z",
        updated_at: "2025-12-16T10:07:41.000Z",
        address: {
          id: 1,
          city: "باجگیران",
          province: "خراسان رضوی",
          plaque: "1",
          unit: "1",
          address_line: "dfsdfsdf",
          address_name: "منزل",
          recipient_name: "null null",
          recipient_phone: "09356867218",
          is_self: true,
          postal_code: "2131231231",
          is_primary: true,
          user_id: 1,
          created_at: "2025-12-16T06:46:20.337Z",
          updated_at: "2025-12-16T06:46:20.337Z",
        },
        gift_wrapping: null,
      },
      user: {
        id: 1,
        first_name: null,
        last_name: null,
        phone: "09356867218",
        is_phone_verified: true,
        email: null,
        is_active: true,
        last_login_at: null,
        avatar_url: null,
        media_id: null,
        created_at: "2025-12-16T04:50:19.134Z",
        updated_at: "2025-12-16T06:41:37.000Z",
      },
      receipt_image: null,
    },
  }; */

  useEffect(() => {
    if (Authority) mutate({ Authority, Status });
  }, [Authority, mutate, Status]);

  console.log({ data });

  const orderAddress = data?.order.address;

  const orderPayment = data?.payment;

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
                        {/* <div className="flex gap-1">
                          {item.variant?.map((i) => (
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
                        </div> */}
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
                  {orderAddress?.is_self
                    ? "خودم"
                    : `${orderAddress?.recipient_name}`}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {orderAddress?.address_line} {orderAddress?.plaque},{" "}
                  {orderAddress?.city} , {orderAddress?.province}
                </p>
              </div>

              {/* پرداخت */}
              <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  اطلاعات پرداخت
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {orderPayment?.gateway}
                </p>
                <p className="text-gray-500 text-xs">{orderPayment?.amount}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {orderPayment?.authority}
                </p>
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {data.success ? (
                <>
                  <Button
                    onClick={() =>
                      router.push(`/profile/orders/${data.order.id}`)
                    }
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
