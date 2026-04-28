"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { persianToEnglishNumbers } from "@/lib/utils/price";

type Range = [number, number];

interface PriceRangeFilterProps {
  /** حداقل مقدار مجاز */
  min?: number;
  /** حداکثر مقدار مجاز */
  max?: number;
  /** گام حرکت */
  step?: number;
  /** واحد پول */
  currency?: string;
  /** غیرفعال کردن کنترل */
  disabled?: boolean;
  /** مقدار اولیه [حداقل, حداکثر] */
  value: Range;
  onMinChange: (price: string) => void;
  onMaxChange: (price: string) => void;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export default function FilterPriceRange({
  min = 0,
  max = 10_000_000_0,
  step = 1000,
  currency = "تومان",
  disabled = false,
  onMaxChange,
  onMinChange,
  value,
}: PriceRangeFilterProps) {
  /** 🟢 استیت داخلی: [minValue, maxValue] */
  const [range, setRange] = React.useState<Range>(value);

  const format = (n: number) => new Intl.NumberFormat("fa-IR").format(n);
  const parse = (s: string) => {
    const englishNumbers = persianToEnglishNumbers(s);
    const onlyDigits = englishNumbers.replace(/[^\d]/g, "");
    return Number(onlyDigits || 0);
  };

  const commit = (next: Range) => {
    const a = clamp(next[0], min, max);
    const b = clamp(next[1], min, max);
    if (a !== value[0]) {
      onMinChange(String(a));
    }

    if (b !== value[1]) {
      onMaxChange(String(b));
    }
    setRange([a, b]);
  };

  // اینپوت‌ها
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parse(e.target.value);
    setRange([n, range[1]]);
  };
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parse(e.target.value);
    setRange([range[0], n]);
  };
  const handleBlur = () => commit(range);

  const handleValueChange = (v: number[]) => {
    setRange([v[0], v[1]] as Range);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col items-center gap-8 mt-8">
        {/* ارزان‌ترین */}
        <div className="flex items-center justify-end space-y-1">
          <Label htmlFor="price-min" className="text-sm pl-3">
            از
          </Label>
          <div className="flex items-center">
            <Input
              id="price-min"
              type="text"
              inputMode="numeric"
              disabled={disabled}
              className="pl-2 text-end font-bold !text-2xl border-0 pb-4 rounded-none border-slate-200 border-b shadow-none"
              value={format(range[0])}
              onChange={handleMinInput}
              onBlur={handleBlur}
            />
            <span className="text-[13px] text-slate-900 pr-3">{currency}</span>
          </div>
        </div>

        <div className="flex items-center justify-end space-y-1">
          <Label htmlFor="price-max" className="text-sm pl-3">
            تا
          </Label>
          <div className="flex items-center">
            <Input
              id="price-max"
              type="text"
              inputMode="numeric"
              disabled={disabled}
              className="pl-2 text-end font-bold !text-2xl border-0 pb-4 rounded-none border-slate-200 border-b shadow-none"
              value={format(range[1])}
              onChange={handleMaxInput}
              onBlur={handleBlur}
            />
            <span className="text-[13px] text-slate-900 pr-3">{currency}</span>
          </div>
        </div>
      </div>

      {/* اسلایدر: دستهٔ چپ = حداکثر ، دستهٔ راست = حداقل */}
      <div className="mt-8 mb-2">
        <Slider
          value={[range[0], range[1]]} // معکوس برای نمایش
          onValueChange={handleValueChange}
          onValueCommit={(v) => commit([v[0], v[1]] as Range)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="mt-4"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-4">
          <span>ارزان‌ترین</span>
          <span>گران‌ترین</span>
        </div>
      </div>

      {/*       <p className="text-sm text-muted-foreground mt-2">
        از {format(range[0])} تا {format(range[1])} {currency}
      </p> */}
    </div>
  );
}
