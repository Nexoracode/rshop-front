import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { StatusOrder } from "@/types/order";
import Image from "next/image";
import React from "react";

function getMessageByStatus(status: StatusOrder) {
  switch (status) {
    case "pending_approval":
    case "shipping":
    case "delivered":
    case "preparing":
    case "refunded":
    case "rejected":
      return {
        title: "این سفارش قبلاً پرداخت شده است",
        description:
          "فاکتور این سفارش قبلاً تسویه شده و امکان پرداخت دوباره وجود ندارد.",
      };
    case "expired":
      return {
        title: "مهلت پرداخت این سفارش منقضی شده است",
        description:
          "زمان مجاز پرداخت این سفارش گذشته است و امکان پرداخت وجود ندارد.",
      };
    default:
      return {
        title: "امکان پرداخت برای این سفارش مقدور نیست",
        description:
          "این سفارش قابل پرداخت نیست. برای مشاهده جزئیات بیشتر وارد صفحه سفارش شوید.",
      };
  }
}
type Props = {
  orderId: number;
  status: StatusOrder;
};

export default function OrderNotPayable({ status, orderId }: Props) {
  const { title, description } = getMessageByStatus(status);
  return (
    <BaseDialog
      open={status !== "awaiting_payment"}
      title="سفارش غیر قابل پرداخت"
      footer={
        <div className="flex w-full gap-2">
          <Button href={`/profile/orders/${orderId}`} fullWidth>
            مشاهده سفارش
          </Button>
          <Button variant="outline" href="/" fullWidth>
            بازگشت به فروشگاه
          </Button>
        </div>
      }
      content={
        <div className="flex flex-col items-center">
          <Image
            src={"/payment-not-allow.png"}
            width={110}
            height={110}
            alt=""
          />

          <h2 className="text-xl font-medium mt-4">{title}</h2>
          <p className="mt-6 text-center text-sm text-gray-600">
            {description}
          </p>
        </div>
      }
    />
  );
}
