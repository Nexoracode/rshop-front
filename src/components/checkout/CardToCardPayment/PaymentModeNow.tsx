import React from "react";
import PaymentModalFooter from "./PaymentModalFooter";
import { useMutation } from "@tanstack/react-query";
import { uploadReceipImage } from "@/queries/orders";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploadField from "@/components/common/Form/ImageUploadField";
import { Media } from "@/types";

export default function PaymentModeNow({
  payment_id,
  onSuccess,
  onClose,
  receipt_image,
}: {
  payment_id: number;
  onSuccess: () => void;
  onClose: () => void;
  receipt_image: Media | null;
}) {
  console.log({ receipt_image });
  const form = useForm({ values: { file: receipt_image?.url } });
  const { mutateAsync, isPending } = useMutation(uploadReceipImage);
  const handleSubmit = (values: FieldValues) => {
    const { file } = values;
    mutateAsync(
      { has_receipt_image: true, files: [file], payment_id },
      { onSuccess }
    );
  };
  return (
    <div className="space-y-3 border rounded-lg p-2">
      <h3 className="font-semibold">بارگزاری رسید پرداخت</h3>

      {/* Dropzone-like uploader */}
      <FormProvider {...form}>
        <form>
          <ImageUploadField required name="file" label="تصویر رسید پرداخت" />
        </form>
      </FormProvider>

      <PaymentModalFooter
        onClick={form.handleSubmit(handleSubmit)}
        onClose={onClose}
        isLoading={isPending}
        disabled={isPending}
      />
    </div>
  );
}
