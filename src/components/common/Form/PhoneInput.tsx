"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/classnames";

interface PhoneInputProps {
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean) => void;
  className?: string;
  error?: string;
}

export default function PhoneInput({
  error,
  defaultValue = "",
  onChange,
  className,
}: PhoneInputProps) {
  const [raw, setRaw] = React.useState(
    defaultValue.replace(/\D/g, "").slice(0, 11),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);

    const isValid = /^09\d{9}$/.test(digits);

    const phone =
      digits.startsWith("0") || digits.length === 0 ? digits : `0${digits}`;
    setRaw(phone);

    if (phone.length === 11) onChange?.(phone, isValid);
  };

  const formatDisplay = (val: string) => {
    const d = val.replace(/\D/g, "");

    if (!d) return "";
    return d
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,3})$/, (m, a, b, c, d) =>
        [a, b, c, d].filter(Boolean).join(" "),
      )
      .trim();
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Input
        dir="ltr"
        inputMode="numeric"
        placeholder="0912 34 56 789"
        value={formatDisplay(raw)}
        onChange={handleChange}
        className={cn(
          "text-center font-semibold tracking-widest input",
          error
            ? "!border-rose-500  focus:border-rose-500 focus-visible:ring-rose-500"
            : "",
        )}
      />
    </div>
  );
}
