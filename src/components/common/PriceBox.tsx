import { formatToman } from "@/lib/utils";
import React from "react";

type Props = {
  price: number;
  className: string;
};

export default function PriceBox({ className, price }: Props) {
  return (
    <span className={className}>
      {formatToman(price, false)} <span className="text-xs">تومان</span>
    </span>
  );
}
