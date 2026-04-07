import { Flame } from "lucide-react";
import React from "react";

type Props = {
  stock: number;
  is_limited_stock: boolean;
};

export default function LimitedStock({ stock, is_limited_stock }: Props) {
  return stock === 0 || stock > 4 || is_limited_stock ? null : (
    <div
      style={{ fontWeight: 500 }}
      className="flex items-center text-danger text-xs font-medium animate-pulse"
    >
      <Flame className="size-5" fill="var(--color-danger)" strokeWidth={0} />
      <span className="pr-1">{`تنها ${stock} عدد در انبار باقی مانده`}</span>
    </div>
  );
}
