"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // اگر util ندارید می‌توانید حذفش کنید
import { Star } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface RatingFieldProps {
  max?: number; // تعداد ستاره‌ها (پیش‌فرض 5)
  defaultValue?: number; // مقدار اولیه
  onChange?: (value: number) => void;
  className?: string;
  size?: number; // سایز آیکون
  name?: string;
}

const ratingLabels = ["خیلی بد", "ضعیف", "متوسط", "خوب", "عالی"];

export default function RatingField({
  max = 5,
  defaultValue = 5,
  onChange,
  className,
  size = 32,
  name = "rating",
}: RatingFieldProps) {
  const [stateValue, setStateValue] = React.useState(defaultValue);
  const [hover, setHover] = React.useState<number | null>(null);
  const { setValue } = useFormContext();

  const handleClick = (index: number) => {
    setStateValue(index);
    setValue(name, index);
    onChange?.(index);
  };

  return (
    <div className="">
      <div
        onMouseLeave={() => setHover(null)}
        className={cn("flex justify-center items-center gap-3", className)}
        dir="ltr"
      >
        {Array.from({ length: max }, (_, i) => {
          const starIndex = i + 1;
          const active = hover ? starIndex <= hover : starIndex <= stateValue;
          return (
            <button
              key={starIndex}
              type="button"
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => setHover(starIndex)}
              className="focus:outline-none text-primary"
              aria-label={`rate ${starIndex}`}
            >
              {active ? (
                <Star
                  size={size}
                  fill="currentColor"
                  strokeWidth={0}
                  className={
                    "text-primary scale-125 drop-shadow-sm transition-all"
                  }
                />
              ) : (
                <Star size={size} className="" />
              )}
            </button>
          );
        })}
      </div>
      <label className="text-lg inline-block w-full h-9 mt-5 font-semibold text-center text-primary">
        {hover ? ratingLabels[hover - 1] : ratingLabels[stateValue - 1]}
      </label>
    </div>
  );
}
