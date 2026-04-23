"use client";

import React, { useState } from "react";
import { Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import useCheckout from "@/hooks/useCheckout";
import TextField from "@/components/common/Form/TextField";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";

export default function GiftMessageInput() {
  const {
    handleSetOrderMeta,
    orderMeta: { gift_message },
  } = useCheckout();

  const [open, setOpen] = useState(false);

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

  return (
    <div className="border p-3 sm:p-4 rounded-xl" dir="rtl">
      <div className="flex items-center gap-6 justify-between">
        <h5 className="font-medium text-xs sm:text-[15px] text-neutral-700">متن دلخواه روی بسته‌بندی</h5>
        
        <div className="flex items-center gap-2">
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
              <Button
                variant={"outline"}
                size={"sm"}
                fullWidth={false}
                startIcon={
                  !gift_message?.length ? (
                    <LucidePlus className="size-5" />
                  ) : (
                    <Edit2Icon className="size-5" />
                  )
                }
              >
                {!gift_message?.length ? "افزودن" : ""}
              </Button>
            }
          />
          
          {gift_message?.length ? (
            <Button
              variant={"outline"}
              size={"sm"}
              fullWidth={false}
              onClick={handleDelete}
              color="danger"
              className="w-10 mx-0"
              startIcon={<Trash2Icon className="size-5" />}
            />
          ) : null}
        </div>
      </div>
      
      {gift_message?.length ? (
        <div className="pt-5">
          <div className="text-sm text-muted">
            {gift_message}
          </div>
        </div>
      ) : null}
    </div>
  );
}