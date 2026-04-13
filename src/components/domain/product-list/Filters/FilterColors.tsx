"use client";

import * as React from "react";
import { ProductAttributeValue } from "@/types/product";
import { cn } from "@/lib/utils/classnames";

type ColorFilterProps = {
  /** آرایه‌ای از رنگ‌ها (hex یا نام معتبر CSS) */
  colors: ProductAttributeValue[];
  /** امکان انتخاب چندگانه (پیش‌فرض: false => انتخاب تکی) */
  multiple?: boolean;
  /** غیرفعال کردن انتخاب */
  disabled?: boolean;

  value: Array<string>;

  onChange: (values: Array<string>) => void;
};

export default function FilterColor({
  colors,
  multiple = false,
  disabled = false,
  value,
  onChange,
}: ColorFilterProps) {
  // 🟢 State داخلی برای رنگ‌های انتخاب‌شده

  const toggle = (color: string) => {
    if (disabled) return;
    let newValue = [];
    if (multiple) {
      newValue = value.includes(color)
        ? value.filter((c) => c !== color)
        : [...value, color];
    } else {
      newValue = value.includes(color) ? [] : [color];
    }
    onChange(newValue);
  };

  return (
    <div className="grid grid-cols-4 gap-3 pt-4">
      {colors.map((color) => {
        const active = value.includes(String(color.id));
        return (
          <button
            key={color.id}
            type="button"
            disabled={disabled}
            onClick={() => toggle(String(color.id))}
            className={
              "relative w-12 flex flex-col items-center justify-center"
            }
            aria-label={`انتخاب رنگ ${color.value}`}
          >
            <span
              className={cn(
                "block h-11 w-11 rounded-lg border border-gray-300 shadow-sm p-1",
                "transition-transform duration-150",
                active && "border-primary border-2",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <span
                style={{ backgroundColor: color.display_color || "#ffffff" }}
                className="inline-block rounded-[10px] w-full h-full border"
              ></span>
            </span>

            {active && (
              <span
                className="absolute h-fit inset-0 flex items-center justify-center text-white text-md top-[17%] font-bold"
                style={{ textShadow: "0 0 2px black" }}
              >
                ✓
              </span>
            )}

            <span className="inline-block pt-2 text-xs font-normal text-muted/70 truncate">
              {color.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}
