import { TomanIcon } from "@/components/Icons/TomanIcon";
import { formatToman } from "@/lib/utils/price";
import React from "react";

type Props = {
  price: number;
  className: string;
};

export default function PriceBox({ className, price }: Props) {
  return (
    <span className={`${className}`}>
      {formatToman(price, false)} <TomanIcon width={22} height={22} />
    </span>
  );
}
