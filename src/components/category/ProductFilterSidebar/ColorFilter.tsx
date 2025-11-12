"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // اگر cn ندارید از clsx یا classnames استفاده کنید.
import { ProductAttributeValue } from "@/types/product";

type ColorFilterProps = {
  /** آرایه‌ای از رنگ‌ها (hex یا نام معتبر CSS) */
  colors: ProductAttributeValue[];
  /** امکان انتخاب چندگانه (پیش‌فرض: false => انتخاب تکی) */
  multiple?: boolean;
  /** غیرفعال کردن انتخاب */
  disabled?: boolean;
};

export default function ColorFilter({
  colors,
  multiple = false,
  disabled = false,
}: ColorFilterProps) {
  // 🟢 State داخلی برای رنگ‌های انتخاب‌شده
  const [selected, setSelected] = React.useState<number[]>([]);

  const toggle = (color: number) => {
    if (disabled) return;
    if (multiple) {
      setSelected((prev) =>
        prev.includes(color)
          ? prev.filter((c) => c !== color)
          : [...prev, color]
      );
    } else {
      setSelected((prev) => (prev.includes(color) ? [] : [color]));
    }
  };

  return (
    <div className="flex p-2 flex-wrap gap-4">
      {colors.map((color) => {
        const active = selected.includes(color.id);
        return (
          <button
            key={color.id}
            type="button"
            disabled={disabled}
            onClick={() => toggle(color.id)}
            className={cn(
              "relative h-10 w-10 ring-offset-4 ring-muted ring-2 rounded-lg border border-gray-300 shadow-sm p-2",
              "transition-transform duration-150 focus:outline-none",
              active && "ring-primary",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: color.display_color || "#ffffff" }}
            aria-label={`انتخاب رنگ ${color.value}`}
          >
            {active && (
              <span
                className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"
                style={{ textShadow: "0 0 2px black" }}
              >
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
