import { TomanIcon } from "@/components/Icons/TomanIcon";
import { formatToman } from "@/lib/utils/price";
import React from "react";

type Props = {
  price: number;
  className: string;
  suffix?: string;
  iconClass?: string;
  showToman?: boolean;
};

export default function PriceBox({
  className,
  price,
  suffix,
  iconClass,
  showToman = true,
}: Props) {
  return (
    <span className={`${className} flex flex-row items-center gap-1`}>
      {formatToman(price, false)}{" "}
      {showToman ? (
        <TomanIcon width={"1.2em"} height="1.2em" className={`${iconClass}`} />
      ) : (
        ""
      )}{" "}
      {suffix}
    </span>
  );
}
