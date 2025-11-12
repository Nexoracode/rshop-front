"use client";
import TextField from "@/components/common/Form/TextField";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ResendCodeCounter from "./ResendCodeCounter";
import { useMutation } from "@tanstack/react-query";
import { useRequestOtp, verifyOtp } from "@/queries/user";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  phone: string;
};

export default function UserOtpForm({ phone }: Props) {
  const form = useForm();
  const { mutate, isPending, isSuccess } = useMutation(verifyOtp);
  const { handleSendOtp, isSuccess: resendSuccess } = useRequestOtp({
    handleSuccess: () => {},
  });
  const search = useSearchParams();

  const backUrl = search.get("backUrl");
  const router = useRouter();
  const handleSubmit = (values: FieldValues) => {
    const { code } = values;
    mutate({
      code,
      identifier: phone,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("ورود به حساب کاربری انجام شد.");
      router.push(`${backUrl}`);
    }
  }, [isSuccess, backUrl, router]);
  return (
    <div>
      <FormProvider {...form}>
        <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
          <h2 className="text-lg font-semibold">کد تایید را وارد کنید</h2>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-light">
              کد تایید برای شماره {phone} ارسال شد.
            </p>

            <TextField required name="code" type="otp" autoFocus />
          </div>

          <ResendCodeCounter
            isSuccess={resendSuccess}
            onResend={() => handleSendOtp({ phone })}
          />

          <div className="space-y-1">
            <Button isLoading={isPending} size={"md"} className="w-full">
              تایید
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
