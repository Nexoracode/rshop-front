"use client";
import TextField from "@/components/common/Form/TextField";
import { Button } from "@/components/ui/button";
import { SHOP_NAME } from "@/data/assets";
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
    <FormProvider {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">
            ورود یا ثبت‌نام در {SHOP_NAME}
          </h2>
          <p className="text-[13px] text-gray-500">
            لطفا شماره موبایل خود را وارد نمایید
          </p>
        </div>

        <div className="space-y-5">
          <TextField required name="phone" type="phone" className="!py-6" />

          <div className="!-mt-1">
            <Button
              isLoading={isPending}
              size={"md"}
              className="w-full h-[48px] rounded-[8px]"
            >
              ورود به {SHOP_NAME}
            </Button>

            <p className="text-xs text-slate-600 mt-5 font-normal text-center">
              ورود شما به معنای پذیرش شرایط {SHOP_NAME} و قوانین حریم‌خصوصی است
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
