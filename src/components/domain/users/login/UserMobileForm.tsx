"use client";
import TextField from "@/components/common/Form/TextField";
import { Button } from "@/components/ui/button";
import { useRequestOtp } from "@/queries/auth/useRequestOtp";
import React, { useCallback, useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
type Props = {
  onSendOtpSucess: (phone: string) => void;
};

export default function UserMobileForm({ onSendOtpSucess }: Props) {
  const form = useForm();

  const phone = form.watch("phone", "");

  const { handleSendOtp, isPending } = useRequestOtp({
    handleSuccess: (variables) => onSendOtpSucess(variables.identifier),
  });
  const handleSubmit = useCallback(
    (values: FieldValues) => {
      handleSendOtp({ phone: values.phone });
    },
    [handleSendOtp],
  );
  useEffect(() => {
    if (phone.length === 11 && !form.formState.isSubmitted) {
      form.handleSubmit(handleSubmit)();
    }
  }, [phone, form, handleSubmit]);
  return (
    <div>
      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <h2 className="text-lg font-semibold">ورود | ثبت نام</h2>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-light">
              لطفا شماره موبایل خود را وارد نمایید
            </p>

            <TextField required name="phone" type="phone" />
          </div>

          <div className="space-y-1">
            <Button isLoading={isPending} size={"md"} className="w-full">
              ورود
            </Button>

            <p className="text-muted-foreground text-xs font-light text-center">
              ورود شما به معنای پذیرش قوانین و مقررات فروشگاه می باشد
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
