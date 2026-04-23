"use client";
import React, { useState } from "react";
import { Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import useCheckout from "@/hooks/useCheckout";
import TextField from "@/components/common/Form/TextField";
import BaseDialog from "@/components/common/BaseDialog";
import EmptySectionCheckout from "./EmptySectionCheckout";

export default function OrderNote() {
  const {
    handleSetOrderMeta,
    orderMeta: { note },
  } = useCheckout();

  const [open, setOpen] = useState(false);

  const form = useForm({ values: { note } });

  const handleSubmit = ({ note }: FieldValues) => {
    const trimedNote = note.trim();

    if (trimedNote.length === 0) return;

    handleSetOrderMeta({ note: trimedNote });
    setOpen(false);
  };

  const formContent = (
    <FormProvider {...form}>
      <form>
        <p className="text-primary font-medium text-sm mb-4">
          این توضیح برای فروشنده ارسال می‌شود.
        </p>
        <TextField
          rows={8}
          label="توضیجات"
          type="textarea"
          autoFocus
          required
          className="resize-none bg-muted/10 border border-muted/30 focus-visible:border-0"
          name="note"
        />
      </form>
    </FormProvider>
  );

  const submitDescription = () => {
    return (
      <BaseDialog
        content={formContent}
        actionLabel="ثبت توضیحات"
        onClick={form.handleSubmit(handleSubmit)}
        cancellButton
        open={open}
        onOpenChange={setOpen}
        title={note.length ? "ویرایش توضیحات" : "توضیحات سفارش"}
        trigger={
          <div className="flex items-center gap-1 text-primary-500 cursor-pointer hover:text-primary-600 transition-all">
            {!note.length ? (
              <LucidePlus className="size-4" />
            ) : (
              <Edit2Icon className="size-4" />
            )}
            <span className="font-medium text-sm">
              {!note.length ? "افزودن" : ""}
            </span>
          </div>
        }
      />
    );
  };

  return (
    <div className="w-1/2 flex flex-col gap-6 border p-6 rounded-lg">
      <div className="w-full flex items-center justify-between gap-8">
        <div className="text-sm text-muted-light">توضیحات سفارش</div>
        <div className="flex items-center gap-4">
          {submitDescription()}
          {note.length ? (
            <div
              className="flex items-center gap-1 text-slate-500 cursor-pointer hover:text-red-500 transition-all"
              onClick={() => handleSetOrderMeta({ note: "" })}
            >
              <Trash2Icon className="size-4" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {note.length ? (
        <div className="font-medium text-sm text-muted leading-8 max-h-[200px] overflow-y-auto">{note}</div>
      ) : (
        <EmptySectionCheckout />
      )}
    </div>
  );
}
