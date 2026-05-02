"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import DateField from "@/components/common/Form/DatePicker";
import TimeField from "@/components/common/Form/TimeInput";
import MaskedCardField from "@/components/common/Form/MaskedCardField";
import { useMutation } from "@tanstack/react-query";
import TextField from "@/components/common/Form/TextField";
import PaymentModalFooter from "./PaymentModalFooter";
import { CardToCardPaymentInfo } from "@/types/order";
import { getTimeString } from "@/lib/utils/date-time";
import { uploadReceipImage } from "@/queries/checkout/payment/card-to-card";

export function PaymentModeInfo({
  payment_id,
  onSuccess,
  onClose,
  values,
}: {
  payment_id: number;
  onSuccess: () => void;
  onClose?: () => void;
  values: CardToCardPaymentInfo | null;
}) {
  const form = useForm({
    values:
      values && values.card_to_card_status === "uploaded"
        ? {
            tracking_code: values.tracking_code,
            sender_card_number: values.sender_card_number,
            deposit_date: values.deposit_date,
            deposit_time: values.deposit_date
              ? getTimeString(values.deposit_date ?? "")
              : null,
          }
        : {
            deposit_time: "18:00",
          },
  });

  const { mutateAsync, isPending } = useMutation(uploadReceipImage);
  const handleSubmit = (values: FieldValues) => {
    const { deposit_date, deposit_time, sender_card_number, tracking_code } =
      values;
    mutateAsync(
      {
        payment_id,
        has_receipt_image: false,
        sender_card_number,
        tracking_code,
        deposit_date: `${deposit_date} ${deposit_time}`,
      },
      {
        onSuccess,
      },
    );
  };

  return (
    <div className="space-y-3 flex flex-col justify-between border h-full rounded-lg p-6">
      <div className="flex flex-col gap-5">
        <h3 className="font-medium">ثبت اطلاعات پرداخت</h3>
        <FormProvider {...form}>
          <form className="space-y-6">
            <div className="flex gap-4">
              <DateField required label="تاریخ پرداخت" name="deposit_date" />
              <TimeField required label="زمان واریز" name="deposit_time" />
            </div>
            <MaskedCardField
              required
              label="شماره کارت مبدا"
              name="sender_card_number"
            />
            <TextField required label="کد پیگیری" name="tracking_code" />
          </form>
        </FormProvider>
      </div>
      <PaymentModalFooter
        onClick={form.handleSubmit(handleSubmit)}
        onClose={onClose}
        isLoading={isPending}
        disabled={isPending}
      />
    </div>
  );
}
