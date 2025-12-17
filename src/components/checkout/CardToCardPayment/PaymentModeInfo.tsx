"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import DateField from "@/components/common/Form/DatePicker";
import TimeField from "@/components/common/Form/TimeInput";
import MaskedCardField from "@/components/common/Form/MaskedCardField";
import { useMutation } from "@tanstack/react-query";
import { uploadReceipImage } from "@/queries/orders";
import TextField from "@/components/common/Form/TextField";
import PaymentModalFooter from "./PaymentModalFooter";

type PaymentFormValues = {
  paymentDate: string;
  paymentTime: string;
  cardNumber: string;
  trackingCode: string;
};

export function PaymentModeInfo({
  payment_id,
  onSuccess,
  onClose,
}: {
  payment_id: number;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const form = useForm<PaymentFormValues>();
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
      }
    );
  };
  return (
    <div>
      <div className="border p-2 space-y-4 rounded-xl">
        <h3 className="font-semibold">ثبت اطلاعات پرداخت</h3>
        <FormProvider {...form}>
          <form>
            <DateField required label="تاریخ پرداخت" name="deposit_date" />

            <TimeField required label="زمان واریز" name="deposit_time" />

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
