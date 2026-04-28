import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { cn } from "@/lib/utils/classnames";
import { PaymentMode } from "./types";

const items = [
  {
    label: "پرداخت کردم و رسید دارم",
    description: "رسید را همین‌جا بارگذاری کنید",
    value: "now",
  },
  {
    label: "پرداخت کردم و اطلاعات پرداخت را دارم",
    description: "اطلاعات پرداخت را همین جا وارد کنید",
    value: "info",
  },
];

const itemWithLater = [
  ...items,
  {
    label: "بعداً پرداخت می‌کنم",
    description: "بعداً از پنل کاربری، رسید را بارگذاری کنید",
    value: "later",
  },
];

type Props = {
  mode: PaymentMode;
  setMode: (m: PaymentMode) => void;
  later: boolean;
};

export default function SelectPaymentMode({ mode, setMode, later }: Props) {
  const selectItems = !later ? itemWithLater : items;

  return (
    <RadioGroup
      value={mode}
      onValueChange={(v) => setMode(v as PaymentMode)}
      className="grid gap-3"
    >
      {selectItems.map((item) => {
        const isActive = mode === item.value;

        return (
          <label
            key={item.value}
            htmlFor={`mode-${item.value}`}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition",
              "hover:border-primary-500",
              isActive && "border-primary bg-primary/5"
            )}
          >
            <RadioGroupItem
              value={item.value}
              id={`mode-${item.value}`}
              className="mt-1"
            />

            <div className="space-y-1">
              <div
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </div>
            </div>
          </label>
        );
      })}
    </RadioGroup>
  );
}