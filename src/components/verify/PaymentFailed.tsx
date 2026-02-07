import React from "react";
import { Card } from "../ui/card";
import { Payment, VerifyOrder } from "@/types/order";
import Image from "../common/Image";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { toPersainDate } from "@/lib/utils";
import PaymentRetryBtn from "./PaymentRetryBtn";

type Props = {
  order: VerifyOrder;
  payment: Payment;
};

export default function PaymentFailed({ order, payment }: Props) {
  return (
    <div className="relative min-h-screen px-4 py-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 ">
      <div className="max-w-3xl pt-12 space-y-4 mx-auto">
        <Card>
          <div className="space-y-3 flex items-start">
            <div>
              <Image
                src={"/payment-not-allow.png"}
                width={75}
                height={75}
                alt=""
                className="border-2 rounded-sm border-danger p-1"
              />
            </div>

            <div className="ps-3">
              <div className="text-lg text-danger font-semibold">
                متاسفانه پرداخت شما ناموفق بود
              </div>

              <div className="text-muted-light">
                شماره سفارش{" "}
                <span className="text-black inline-block ps-2">
                  {order?.id}
                </span>
              </div>
            </div>
          </div>
          <div className="space-x-4 flex">
            <PaymentRetryBtn order_id={order.id} />
            <Button href={`/checkout/payment/${order.id}`} variant={"text"}>
              تغییر روش پرداخت
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex text-sm gap-2 text-muted-light items-center">
            <AlertCircle />
            چنانچه مبلغی از حساب شما کسر شده باشد تا 72 ساعت آینده به حساب شما
            باز خواهد گشت.
          </div>

          <div>
            <span className="font-semibold">جزییات پرداخت</span>

            <div className="flex items-center gap-5 mt-6">
              <span className="inline-block bg-primary w-3 h-3 rounded-full"></span>

              <span className="text-sm">درگاه</span>

              <div className="text-sm  text-muted-light">
                کد پیگیری
                <span className="text-black block mt-5">
                  {payment?.authority.replace(/^[sS0]+/, "")}
                </span>
              </div>
              <div className="text-sm  text-muted-light">
                تاریخ
                <span className="text-black block mt-5">
                  {payment ? toPersainDate(payment?.created_at) : ""}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
