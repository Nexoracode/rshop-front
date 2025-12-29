"use client";

import useCountDown from "@/hooks/useCountDown";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import React from "react";

interface CountdownTimerProps {
  targetDate: Date | string;
  showIcon?: boolean;
  onExpire?: () => void;
  color?: "white" | "red";
}

export default function CountdownTimer({
  targetDate,
  showIcon = true,
  onExpire,
  color = "red",
}: CountdownTimerProps) {
  const { timeLeft } = useCountDown({ targetDate, onExpire });

  return (
    <div className="flex  items-center gap-2 text-sm font-medium text-red-600">
      {showIcon && <Clock className={"text-red-600"} />}
      {timeLeft.expired ? (
        <span className="text-gray-500">تمام شد</span>
      ) : (
        <div className="flex w-full flex-row-reverse gap-2 text-xs sm:text-sm">
          <TimeBox label="روز" value={timeLeft.days} color={color} />
          <TimeBox label="ساعت" value={timeLeft.hours} color={color} />
          <TimeBox label="دقیقه" value={timeLeft.minutes} color={color} />
          <TimeBox label="ثانیه" value={timeLeft.seconds} color={color} />
        </div>
      )}
    </div>
  );
}

const TimeBox = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "white" | "red";
}) => (
  <div className="flex flex-col items-center  justify-center">
    <span
      className={cn(
        "text-sm flex justify-center items-center border border-danger text-danger rounded-full h-6 w-6",
        color === "white" && "bg-white rounded-md h-8 w-8"
      )}
    >
      {value}
    </span>
    <span
      className={cn(
        "text-[10px] text-gray-500",
        color === "white" && "text-white"
      )}
    >
      {label}
    </span>
  </div>
);
