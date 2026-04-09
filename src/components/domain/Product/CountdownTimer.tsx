"use client";

import useCountDown from "@/hooks/useCountDown";
import { cn } from "@/lib/utils/classnames";
import React from "react";

interface CountdownTimerProps {
  targetDate: Date | string;
  showIcon?: boolean;
  onExpire?: () => void;
  color?: "white" | "red";
}

export default function CountdownTimer({
  targetDate,
  onExpire,
  color = "red",
}: CountdownTimerProps) {
  const { timeLeft } = useCountDown({ targetDate, onExpire });

  return (
    <div className="flex  items-center gap-2 text-sm font-medium !text-black">
      {timeLeft.expired ? (
        <span className="text-gray-500">تمام شد</span>
      ) : (
        <div className="flex w-full text-white items-center flex-row-reverse gap-1 text-xs sm:text-sm">
          {+timeLeft.days > 0 && (
            <TimeBox label="روز" value={timeLeft.days} color={color} />
          )}
          <TimeBox label="ساعت" value={timeLeft.hours} color={color} /> :
          <TimeBox label="دقیقه" value={timeLeft.minutes} color={color} /> :
          <TimeBox label="ثانیه" value={timeLeft.seconds} color={color} />
        </div>
      )}
    </div>
  );
}

const TimeBox = ({
  value,
  color,
}: {
  value: string;
  label: string;
  color: "white" | "red";
}) => (
  <div className="flex flex-col items-center  justify-center">
    <span
      className={cn(
        "text-sm flex justify-center items-center text-black rounded-full h-6 w-6",
        color === "white" && "bg-white rounded-md h-6 w-6 md:w-8 md:h-8",
      )}
    >
      {value}
    </span>
  </div>
);
