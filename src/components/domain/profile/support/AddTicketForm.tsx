"use client";
import BackButton from "@/components/common/BackButton";
import SelectField from "@/components/common/Form/SelectField";
import TextField from "@/components/common/Form/TextField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createSupportTicket } from "@/queries/profile/support";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import TicketSubmitSuccess from "./TicketSubmitSuccess";
import { TicketTopic } from "@/types/user";

type Props = {
  onBack: () => void;
  category: TicketTopic;
};

export default function AddTicketForm({ onBack, category }: Props) {
  const {
    mutate,
    isPending,
    isSuccess,
    data: ticket,
  } = useMutation(createSupportTicket);
  const form = useForm();
  const handleSubmit = ({ subject, content }: FieldValues) => {
    const subjectLabel =
      category.items.find((item) => item.value === subject)?.label ??
      category.category;
    mutate({
      subject: subjectLabel,
      content,
    });
  };

  return isSuccess && ticket ? (
    <TicketSubmitSuccess />
  ) : (
    <div className="space-y-6">
      <Label>
        <BackButton onClick={onBack} />
        {category.category}
      </Label>
      <FormProvider {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <SelectField
            options={category.items}
            name="subject"
            required
            label="انتخاب موضوع"
          />

          <TextField type="textarea" name="content" label="متن پیام" required />

          <Button isLoading={isPending} fullWidth>
            ثبت درخواست پشتیبانی
          </Button>
          {/* Form fields go here */}
        </form>
      </FormProvider>
    </div>
  );
}
