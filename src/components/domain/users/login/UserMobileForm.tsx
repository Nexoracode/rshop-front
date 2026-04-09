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
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h2 className="text-[19px] text-slate-700 font-extrabold">
            ورود به حساب کاربری
          </h2>
          <p className="text-[13px] text-slate-500">ورود یا ثبت نام در {SHOP_NAME}</p>
        </div>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <p className="text-[13px] text-gray-500">
              شماره موبایل خود را وارد نمایید
            </p>
          </div>

          <div className="space-y-5">
            <TextField required name="phone" type="phone" className="!py-6" />

            <div className="!-mt-1">
              <Button
                isLoading={isPending}
                size={"md"}
                className="w-full text-sm h-[48px] rounded-[8px] bg-black/80 hover:bg-black/70"
              >
                ادامه و ورود به {SHOP_NAME}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
