"use client";

import React, { useState } from "react";
import { Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import useCheckout from "@/hooks/useCheckout";
import TextField from "@/components/common/Form/TextField";
import BaseDialog from "@/components/common/BaseDialog";

export default function GiftMessageInput() {
  const [open, setOpen] = useState(false);
  const {
    handleSetOrderMeta,
    orderMeta: {is_gift = false, gift_message },
  } = useCheckout();
    console.log(is_gift);
    
  if (!is_gift) {
    return null
  }

  const form = useForm({ values: { gift_message: gift_message || "" } });

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
    <div className="gap-2 items-center">
      <div className="flex items-center justify-between gap-8 mb-2">
        <div className="text-[13px] text-muted-light">توضیحات بسته بندی:</div>

        {gift_message?.length ? (
          <div className="flex items-center gap-3">
            {GiftMessageModal()}
            <div
              className="flex items-center gap-1 text-slate-500 cursor-pointer hover:text-red-500 transition-all"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
              <span className="font-medium text-sm">
                {!gift_message.length ? "افزودن" : ""}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="font-medium text-sm text-muted">
        {gift_message?.length ? gift_message : GiftMessageModal()}
      </div>
    </div>
  );
}
