"use client";
import TextField from "@/components/common/Form/TextField";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ResendCodeCounter from "./ResendCodeCounter";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRequestOtp } from "@/queries/auth/useRequestOtp";
import { verifyOtp } from "@/queries/auth/auth";

type Props = {
  phone: string;
};

export default function UserOtpForm({ phone }: Props) {
  const form = useForm();
  const { mutateAsync, isPending, isSuccess, data } = useMutation(verifyOtp);
  const { handleSendOtp, isSuccess: resendSuccess } = useRequestOtp({
    handleSuccess: () => {},
  });

  const search = useSearchParams();

  const backUrl = search.get("backUrl") ?? "/";
  const router = useRouter();

  const code = form.watch("code", "");

  useEffect(() => {
    let test = null;
    if (data?.user) {
      toast.success("ورود به حساب کاربری انجام شد.");
      router.refresh();
      test = setTimeout(() => {
        router.push(`${backUrl}`);
      }, 500);
    }
    return () => {
      if (test) {
        clearTimeout(test);
      }
    };
  }, [isSuccess, data]);

  useEffect(() => {
    if (code.length === 6) handleSubmit({ code });
  }, [code]);

  const handleSubmit = (values: FieldValues) => {
    const { code } = values;
    mutateAsync({
      code,
      identifier: phone,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[19px] text-slate-800 font-extrabold">
            کد تایید را وارد کنید
          </h2>
          <p className="text-[13px] text-slate-700 mt-5 mb-2">
            کد به {Number(phone).toLocaleString("fa", { useGrouping: false })}{" "}
            ارسال شد.
          </p>
          <ResendCodeCounter
            isSuccess={resendSuccess}
            onResend={() => handleSendOtp({ phone })}
          />
        </div>

        <TextField
          rules={{
            minLength: {
              value: 6,
              message: "کد تاییدیه باید دارای 6 کاراکتر باشد.",
            },
          }}
          required
          name="code"
          type="otp"
          autoFocus
        />

        <Button
          isLoading={isPending}
          size={"md"}
          className="w-full text-sm h-[48px] rounded-[8px] bg-black/80 hover:bg-black/70"
        >
          تایید و ورود
        </Button>
      </form>
    </FormProvider>
  );
}
