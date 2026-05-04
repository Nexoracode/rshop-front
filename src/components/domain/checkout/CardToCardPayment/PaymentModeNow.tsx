import React from "react";
import PaymentModalFooter from "./PaymentModalFooter";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploadField from "@/components/common/Form/ImageUploadField";
import { Media } from "@/types";
import { uploadReceipImage } from "@/queries/checkout/payment/card-to-card";
import { toast } from "sonner";
import { Payment } from "@/types/order";
import Image from "@/components/common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Alert } from "@/components/ui/alert";

export default function PaymentModeNow({
  payment_id,
  onSuccess,
  onClose,
  receipt_image,
  status,
}: {
  payment_id: number;
  onSuccess: () => void;
  onClose?: () => void;
  receipt_image: Media | null;
  status: Payment["card_to_card_status"];
}) {
  const form = useForm({ values: { file: receipt_image?.url } });
  const { mutateAsync, isPending } = useMutation(uploadReceipImage);
  const handleSubmit = (values: FieldValues) => {
    const { file } = values;
    mutateAsync(
      { has_receipt_image: true, files: [file], payment_id },
      {
        onSuccess: (data) => {
          if (!data) {
            toast.error("آپلود رسید پرداخت با خطا مواجه شد.");
            return;
          }
          onSuccess();
        },
      },
    );
  };
  return (
    <div className="space-y-3 flex flex-col justify-between border h-full rounded-lg p-6">
      {status === "pending" ? (
        <div className="flex flex-col gap-5">
          <h3 className="font-medium">بارگذاری رسید پرداخت</h3>
          <FormProvider {...form}>
            <form>
              <ImageUploadField required name="file" label="" />
            </form>
          </FormProvider>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <h3 className="font-medium"> رسید پرداخت</h3>

          {status === "rejected" ? (
            <Alert message="رسید پرداخت شما معتبر نیست." variant="error" />
          ) : (
            ""
          )}
          {status === "approved" ? (
            <Alert message="رسید پرداخت شما تایید شد." variant="success" />
          ) : (
            ""
          )}
          <Image
            src={receipt_image?.url ?? PRODUCT_PLACEHOLDER}
            width={200}
            height={200}
            alt=""
          />
        </div>
      )}

      <PaymentModalFooter
        onClick={form.handleSubmit(handleSubmit)}
        onClose={onClose}
        isLoading={isPending}
        disabled={isPending}
      />
    </div>
  );
}
