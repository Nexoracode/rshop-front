import React from "react";
import PaymentModalFooter from "./PaymentModalFooter";
import { useMutation } from "@tanstack/react-query";
import { uploadReceipImage } from "@/queries/orders";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploadField from "@/components/common/Form/ImageUploadField";

export default function PaymentModeNow({
  payment_id,
  onSuccess,
  onClose,
}: {
  payment_id: number;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const form = useForm();
  const { mutateAsync, isPending } = useMutation(uploadReceipImage);
  const handleSubmit = (values: FieldValues) => {
    const { file } = values;
    console.log({ file });
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
