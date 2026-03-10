"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/classnames";

interface OtpSingleInputProps {
  error?: string;
  length?: number; // تعداد رقم‌های مجاز
  onChange?: (value: string) => void;
  className?: string;
}

export default function OtpInput({
  length = 6,
  error,
  onChange,
  className,
}: OtpSingleInputProps) {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // فقط ارقام
    if (val.length > length) val = val.slice(0, length);
    setValue(val);
    onChange?.(val);
  };

  // نمایش OTP با فاصله بین ارقام
  const displayValue = value.split("").join(" ");

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      autoFocus
      dir="ltr"
      inputMode="numeric"
      maxLength={length * 2} // چون فاصله‌ها هم حساب می‌شن
      className={cn(
        "input tracking-[0.6em] text-center text-lg !py-6 font-bold",
        error && "border-rose-500 focus-visible:ring-rose-500",
        className,
      )}
      placeholder={Array(length).fill("•").join(" ")} // مثلا "• • • • • •"
    />
  );
}
