import { Truck } from "lucide-react";
import React from "react";

type Props = {
  preparation_days: number | null;
  requires_preparation: boolean;
  is_same_day_shipping: boolean;
};

export default function ProductShipping({
  is_same_day_shipping,
  requires_preparation,
  preparation_days,
}: Props) {
  return (is_same_day_shipping || requires_preparation) && preparation_days ? (
    <div className="flex items-center gap-1 text-secondary text-xs">
      <Truck className="size-4" />
      <span>{is_same_day_shipping ? "ارسال امروز" : null}</span>
      <span>
        {requires_preparation
          ? `زمان آماده سازی ${preparation_days} روز`
          : null}
      </span>
    </div>
  ) : null;
}
