"use client";

import { cn } from "@/lib/utils/classnames";
import { Card } from "@/components/ui/card";
import { toFaDigits } from "@/lib/utils/price";
import Image from "next/image";

type OrderStatCardProps = {
  iconSrc: string; // masir image
  label: string;
  value: number | undefined;
  highlight?: boolean;
  action?: React.ReactNode;
};

function OrderStatCard({
  iconSrc,
  label,
  value,
  highlight,
  action,
}: OrderStatCardProps) {
  return (
    <Card
      className={cn(
        "p-3 md:p-4 flex items-center lg:flex-row relative justify-between gap-2 transition-all bg-white rounded-lg",
        highlight && "flex-row justify-start",
      )}
    >
      {/* Image be jaye Icon */}
      <div className="relative w-7 h-7 md:w-10 md:h-10 shrink-0">
        <Image
          src={iconSrc}
          alt={label}
          fill
          className="object-contain"
        />
      </div>

      <p className="text-[13px] flex-1 text-slate-700">{label}</p>
      <p className="md:text-xl text-base flex items-center justify-center leading-0 font-medium lg:relative absolute top-1 left-1 lg:left-auto lg:top-auto text-primary rounded-full w-6 h-6 lg:h-8 lg:w-8">
        {toFaDigits(value ?? 0)}
      </p>
      {action}
    </Card>
  );
}

export default OrderStatCard;