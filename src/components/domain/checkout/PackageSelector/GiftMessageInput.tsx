"use client";

import React, { useState } from "react";
import { Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import useCheckout from "@/hooks/useCheckout";
import TextField from "@/components/common/Form/TextField";
import BaseDialog from "@/components/common/BaseDialog";
import EmptySectionCheckout from "../EmptySectionCheckout";

export default function GiftMessageInput() {
  const {
    handleSetOrderMeta,
    orderMeta: { is_gift = false, gift_message },
  } = useCheckout();
  const form = useForm({ values: { gift_message: gift_message || "" } });
  const [open, setOpen] = useState(false);
  console.log(is_gift);

  if (!is_gift) {
    return null;
  }

  const handleSubmit = ({ gift_message }: FieldValues) => {
    const trimmedMessage = gift_message?.trim();

    // اگر خالی بود، متا رو خالی کن
    if (!trimmedMessage) {
      handleSetOrderMeta({ gift_message: "" });
      setOpen(false);
      return;
    }

    handleSetOrderMeta({ gift_message: trimmedMessage });
    setOpen(false);
  };

  const handleDelete = () => {
    handleSetOrderMeta({ gift_message: "" });
  };

  const formContent = (
    <FormProvider {...form}>
      <form>
        <p className="text-primary font-medium text-sm mb-4">
          پیغام شما روی بسته‌بندی چاپ می‌شود.
        </p>
        <TextField
          rows={4}
          label="متن پیغام"
          type="textarea"
          autoFocus
          required={false}
          className="resize-none 0 border border-muted/30 focus-visible:border-0"
          name="gift_message"
          placeholder="پیغام شما روی بسته‌بندی چاپ می‌شود..."
        />
      </form>
    </FormProvider>
  );

  const GiftMessageModal = () => {
    return (
      <BaseDialog
        content={formContent}
        actionLabel="ثبت متن"
        onClick={form.handleSubmit(handleSubmit)}
        cancellButton
        open={open}
        onOpenChange={setOpen}
        title={
          gift_message?.length
            ? "ویرایش متن بسته‌بندی"
            : "افزودن متن به بسته‌بندی (اختیاری)"
        }
        trigger={
          <div className="flex items-center gap-1 text-primary-500 cursor-pointer hover:text-primary-600 transition-all">
            {!gift_message?.length ? (
              <LucidePlus className="size-4" />
            ) : (
              <Edit2Icon className="size-4" />
            )}
            <span className="font-medium text-sm">
              {!gift_message?.length ? "افزودن" : ""}
            </span>
          </div>
        }
      />
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 border-b sm:border sm:rounded-lg px-2 py-6 sm:p-6">
      <div className="flex items-center justify-between gap-8">
        <div className="text-[13px] text-muted-light">توضیحات بسته بندی</div>

        <div className="flex items-center gap-4">
          {GiftMessageModal()}
          {gift_message?.length ? (
            <div
              className="flex items-center gap-1 text-slate-500 cursor-pointer hover:text-red-500 transition-all"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
              <span className="font-medium text-sm">
                {!gift_message.length ? "افزودن" : ""}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {gift_message?.length ? (
        <div className="font-medium text-sm text-muted leading-8 max-h-[200px] overflow-y-auto scrollbar-custom pl-2">
          {gift_message}
        </div>
      ) : (
        <EmptySectionCheckout />
      )}
    </div>
  );
}
