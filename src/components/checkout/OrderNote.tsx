"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit2Icon } from "lucide-react";
import { useCheckout } from "@/queries/orders";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import TextField from "../common/Form/TextField";

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
  return (
    <div>
      {note.length ? (
        <div>
          <h5 className="font-semibold text-neutral-700">توضیحات سفارش</h5>

          <div
            className="text-sm py-5 text-muted"
            dangerouslySetInnerHTML={{ __html: note }}
          ></div>
        </div>
      ) : null}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"text-nohover"}
            size={"sm"}
            fullWidth={false}
            className="w-auto max-w-fit mx-0"
            startIcon={<Edit2Icon className="size-4" />}
          >
            {note.length
              ? "ویرایش توضیحات"
              : "ثبت توضیحات برای سفارش (اختیاری)"}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>ثبت توضیحات برای سفارش (اختیاری)</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              <div className="flex gap-4">
                <DialogClose asChild>
                  <Button fullWidth variant={"outline"}>
                    انصراف
                  </Button>
                </DialogClose>
                <Button fullWidth onClick={handleSubmit} type="submit">
                  ثبت توضیحات
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
