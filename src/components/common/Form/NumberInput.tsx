"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/classnames";
import React, { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  error: boolean;
  label: string;
  value: string | number;
  onChange: (v: string) => void;
} & ComponentProps<typeof Input>;

export default function NumberInput({
  value = "",
  error,
  onChange,
  label,
  ...props
}: Props) {
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const isValid = /^[0-9]*$/.test(inputValue);
      if (!isValid) {
        toast.error(`برای فیلد ${label} فقط ورود عدد مجاز است.`);
        return;
      }
      onChange?.(inputValue);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [inputValue]);
  return (
    <Input
      dir="ltr"
      inputMode={"numeric"}
      pattern={"[0-9]*"}
      placeholder=""
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className={cn(
        "text-right tracking-widest input",
        error && "border-rose-500 focus-visible:ring-rose-500",
      )}
      {...props}
    />
  );
}
