"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  label?: string;
  required?: boolean;
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
  const [raw, setRaw] = React.useState<string>(defaultValue.replace(/\D/g, ""));

  // 📌 ولیدیشن: شماره ایران (10 یا 11 رقم)
  const isValid = React.useMemo(() => {
    if (/^09\d{9}$/.test(raw)) return true; // با صفر
    if (/^9\d{9}$/.test(raw)) return true; // بدون صفر
    return false;
  }, [raw]);

  React.useEffect(() => {
    onChange?.(raw, isValid);
  }, [raw, isValid, onChange]);

  // 📌 گروه‌بندی شماره
  const formatDisplay = (val: string) => {
    // شماره ایران الگو: 4-2-2-3
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    const match = digits.match(/^(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,3})$/);
    if (!match) return digits;
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 11) setRaw(digits);
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Input
        dir="ltr"
        inputMode="numeric"
        placeholder="0912 33 44 344 :مثال"
        value={formatDisplay(raw)}
        onChange={handleChange}
        className={cn(
          "text-right tracking-widest input",
          error || !isValid
            ? "border-rose-500 focus-visible:ring-rose-500"
            : null
        )}
      />
    </div>
  );
}
