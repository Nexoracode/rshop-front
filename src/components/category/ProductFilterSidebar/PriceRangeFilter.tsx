"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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

export default function PriceRangeFilter({
  min = 0,
  max = 10_000_000_0,
  step = 1000,
  currency = "تومان",
  disabled = false,
  value,
  onMaxChange,
  onMinChange,
}: PriceRangeFilterProps) {
  /** 🟢 استیت داخلی: [minValue, maxValue] */
  const [range, setRange] = React.useState<Range>([min, max]);

  const format = (n: number) => new Intl.NumberFormat("fa-IR").format(n);
  const parse = (s: string) => {
    const onlyDigits = s.replace(/[^\d]/g, "");
    return Number(onlyDigits || 0);
  };

  const commit = (next: Range) => {
    const a = clamp(next[0], min, max);
    const b = clamp(next[1], min, max);
    onMinChange(String(a));
    onMaxChange(String(b));
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
      <div className="flex items-center gap-3">
        {/* ارزان‌ترین */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="price-min" className="text-xs">
            از
          </Label>
          <div className="relative">
            <Input
              id="price-min"
              type="text"
              inputMode="numeric"
              disabled={disabled}
              className="pl-10 text-right font-bold !text-lg"
              value={format(range[0])}
              onChange={handleMinInput}
              onBlur={handleBlur}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {currency}
            </span>
          </div>
        </div>
        {/* گران‌ترین */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="price-max" className="text-xs">
            تا
          </Label>
          <div className="relative">
            <Input
              id="price-max"
              type="text"
              inputMode="numeric"
              disabled={disabled}
              className="pl-10 text-right font-bold !text-lg"
              value={format(range[1])}
              onChange={handleMaxInput}
              onBlur={handleBlur}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* اسلایدر: دستهٔ چپ = حداکثر ، دستهٔ راست = حداقل */}
      <div className="px-1">
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
        <div className="flex justify-between text-xs text-muted-foreground mt-4">
          <span>ارزان‌ترین</span>
          <span>گران‌ترین</span>
        </div>
      </div>

      {/* نمایش مقدار انتخابی نهایی */}
      <p className="text-sm text-muted-foreground mt-2">
        بازهٔ انتخابی: از {format(range[0])} تا {format(range[1])} {currency}
      </p>
    </div>
  );
}
