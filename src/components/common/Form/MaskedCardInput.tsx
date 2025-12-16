"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreditCardIcon } from "lucide-react";

interface MaskedCardInputProps {
  value: string; // فقط رقم خام بدون فاصله
  onChange: (val: string) => void;
}

export function MaskedCardInput({
  value: valueProp,
  onChange,
}: MaskedCardInputProps) {
  const [value, setValue] = useState(() => valueProp || "");

  // 1) فقط عدد و حداکثر 16 رقم
  const normalize = (raw: string) => raw.replace(/\D/g, "").slice(0, 16);

  // 2) ساخت ماسک: ____ ____ ____ ____
  const mask = (digits: string): string => {
    const padded = digits.padEnd(16, "_");
    return (
      padded.slice(0, 4) +
      " " +
      padded.slice(4, 8) +
      " " +
      padded.slice(8, 12) +
      " " +
      padded.slice(12, 16)
    );
  };

  const masked = mask(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    // ورودی شامل فاصله است → باید همه چیز normalize شود
    const rawDigits = normalize(input);

    setValue(rawDigits);

    onChange(rawDigits);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض حذف
      setValue((prev) => prev.slice(0, -1)); // حذف آخرین رقم
    }
  };

  return (
    <div className="relative">
      <Input
        dir="ltr"
        value={masked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        className="tracking-widest text-right font-medium input"
        placeholder="____ ____ ____ ____"
      />

      <CreditCardIcon className="absolute top-[50%] text-primary left-3 -translate-y-[50%]" />
    </div>
  );
}
