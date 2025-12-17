import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { PaymentMode } from "./types";

const items = [
  {
    label: "پرداخت کردم و رسید دارم",
    description: "رسید را همین‌جا بارگذاری کنید",
    value: "now",
  },
  {
    label: "پرداخت کردم واطلاعات پرداخت را دارم",
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
    <div className="space-y-3">
      <Label className="text-base">وضعیت پرداخت</Label>
      <RadioGroup
        defaultValue="now"
        value={mode}
        onValueChange={(v) => setMode(v as PaymentMode)}
        className="grid grid-cols-1 gap-3"
      >
        {selectItems.map((item) => (
          <label
            key={item.value}
            dir="rtl"
            className="flex items-center gap-2 rounded-xl border p-2 cursor-pointer"
          >
            <RadioGroupItem value={item.value} id="mode-now" />
            <div className="leading-tight">
              <div className="font-medium text-sm">{item.label}</div>
              <div className="text-xs text-muted">{item.description}</div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
