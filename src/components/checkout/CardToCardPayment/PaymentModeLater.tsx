"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";
import PaymentModalFooter from "./PaymentModalFooter";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { cardTocardPaymentLater } from "@/queries/orders";

export default function PaymentModeLater({
  onClose,
  onSuccess,
  order_id,
}: {
  onSuccess: () => void;
  onClose: () => void;
  order_id: number;
}) {
  const { mutateAsync, isPending } = useMutation(cardTocardPaymentLater);

  const handleSubmit = () => {
    mutateAsync({ order_id }, { onSuccess });
  };
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-xl border p-3 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertTriangle className="size-5 shrink-0 mt-0.5" />
        <p className="text-sm leading-6">
          فرصت پرداخت <span className="font-semibold">محدود</span> است و ممکن
          است موجودی محصول به اتمام برسد. لطفاً در اولین فرصت از پنل کاربری
          اقدام کنید.
        </p>
      </div>
      <Separator />
      <PaymentModalFooter
        isLoading={isPending}
        onClick={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
}
