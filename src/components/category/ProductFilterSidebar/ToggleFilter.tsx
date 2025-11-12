"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleFilterProps {
  /** برچسبی که کنار سوییچ نمایش داده می‌شود */
  label?: string;
  /** اگر true باشد سوییچ غیرفعال است */
  disabled?: boolean;
}

export default function ToggleFilter({
  label = "فیلتر فعال",
  disabled = false,
}: ToggleFilterProps) {
  // 🟢 استیت داخلی روشن/خاموش
  const [enabled, setEnabled] = React.useState<boolean>(false);

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="toggle-filter" className="font-semibold text-neutral-600">
        {label}
      </Label>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        disabled={disabled}
        id="toggle-filter"
      />
    </div>
  );
}
