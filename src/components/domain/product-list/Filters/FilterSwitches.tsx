"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleFilterProps {
  /** برچسبی که کنار سوییچ نمایش داده می‌شود */
  label?: string;
  /** اگر true باشد سوییچ غیرفعال است */
  disabled?: boolean;
  toggleId?: string;

  checked?: boolean;
  onCheckedChange?: (check: boolean) => void;
  className?: string
}

export default function FilterSwitches({
  label = "فیلتر فعال",
  disabled = false,
  checked = false,
  toggleId = "",
  onCheckedChange = () => {},
  className
}: ToggleFilterProps) {
  // 🟢 استیت داخلی روشن/خاموش

  return (
    <div className={`flex border-b border-[#f2f2f2] py-4 items-center justify-between ${className}`}>
      <Label
        htmlFor={`toggle-filter-${toggleId}`}
        className="font-medium  w-full flex justify-between text-neutral-600"
      >
        {label}
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          id={`toggle-filter-${toggleId}`}
        />
      </Label>
    </div>
  );
}
