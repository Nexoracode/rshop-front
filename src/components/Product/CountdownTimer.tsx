"use client";

import { Clock } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date | string;
  showIcon?: boolean;
  onExpire?: () => void;
}

function calculateTimeLeft(targetDate: Date) {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    expired: false,
  };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      expired: false,
    };
  } else {
    timeLeft.expired = true;
  }

  return timeLeft;
}

export default function CountdownTimer({
  targetDate,
  showIcon = true,
  onExpire,
}: CountdownTimerProps) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(target);
      setTimeLeft(updated);
      if (updated.expired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onExpire]);

  return (
    <div className="flex w-full  items-center gap-2 text-sm font-medium text-red-600">
      {showIcon && <Clock className="text-red-600" />}
      {timeLeft.expired ? (
        <span className="text-gray-500">تمام شد</span>
      ) : (
        <div className="flex w-full flex-row-reverse gap-2 text-xs sm:text-sm">
          <TimeBox label="روز" value={timeLeft.days} />
          <TimeBox label="ساعت" value={timeLeft.hours} />
          <TimeBox label="دقیقه" value={timeLeft.minutes} />
          <TimeBox label="ثانیه" value={timeLeft.seconds} />
        </div>
      )}
    </div>
  );
}

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center  justify-center">
    <span className="text-sm flex justify-center items-center border border-danger text-danger rounded-full h-6 w-6">
      {value}
    </span>
    <span className="text-[10px] text-gray-500">{label}</span>
  </div>
);
