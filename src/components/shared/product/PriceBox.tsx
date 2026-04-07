import { TomanIcon } from "@/components/Icons/TomanIcon";
import { formatToman } from "@/lib/utils/price";
import React from "react";

type Props = {
  price: number;
  className: string;
  suffix?: string;
  iconSize?: number;
};

export default function PriceBox({ className, price, suffix }: Props) {
  return (
    <span className={`${className}`}>
      {formatToman(price, false)} <TomanIcon width={"1.2em"} height="1.2em" />{" "}
      {suffix}
    </span>
  );
}
