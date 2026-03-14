"use client";
import React, { useState } from "react";
import { Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import useCheckout from "@/hooks/useCheckout";
import TextField from "@/components/common/Form/TextField";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";

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
        <p className="text-primary font-semibold text-sm mb-4">
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
  return (
    <div className="border p-6 rounded-xl">
      <div className="flex items-center gap-6 justify-between">
        <h5 className="font-semibold text-neutral-700">توضیحات سفارش</h5>
        <div className="flex items-center gap-2">
          <BaseDialog
            content={formContent}
            actionLabel="ثبت توضیحات"
            onClick={form.handleSubmit(handleSubmit)}
            cancellButton
            open={open}
            onOpenChange={setOpen}
            title={
              note.length
                ? "ویرایش توضیحات"
                : "ثبت توضیحات برای سفارش (اختیاری)"
            }
            trigger={
              <Button
                variant={"outline"}
                size={"sm"}
                fullWidth={false}
                startIcon={
                  !note.length ? (
                    <LucidePlus className="size-5" />
                  ) : (
                    <Edit2Icon className="size-5" />
                  )
                }
              >
                {!note.length ? "افزودن" : ""}
              </Button>
            }
          />
          {note.length ? (
            <Button
              variant={"outline"}
              size={"sm"}
              fullWidth={false}
              onClick={() => handleSetOrderMeta({ note: "" })}
              color="danger"
              className="w-10 mx-0"
              startIcon={<Trash2Icon className="size-5" />}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {note.length ? (
        <div>
          <div
            className="text-sm pt-5 text-muted"
            dangerouslySetInnerHTML={{ __html: note }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
