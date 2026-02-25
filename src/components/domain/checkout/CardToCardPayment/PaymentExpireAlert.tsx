"use client";
import { toPersianDateTime } from "@/lib/utils/date-time";
import { AlertCircle } from "lucide-react";
import React from "react";

type Props = {
  date: string;
};

export default function PaymentExpireAlert({ date }: Props) {
  return (
    <div className="bg-warning/10 rounded-lg p-2 md:p-4 flex items-center">
      <AlertCircle className="text-info block md:size-5 size-9" />
      <p className="text-xs leading-6 md:text-sm ps-2">
        {`شما تا ${toPersianDateTime(
          new Date(Date.parse(date) + 3600 * 1000 * 3).toISOString(),
        )} جهت پرداخت مبلغ سفارش و بارگزاری اطلاعات پرداخت مهلت دارید.`}
      </p>
    </div>
  );
}
