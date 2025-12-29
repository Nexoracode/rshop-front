"use client";
import { useEffect, useMemo, useState } from "react";

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
type Props = {
  targetDate: Date | string;
  onExpire?: () => void;
};

export default function useCountDown({ targetDate, onExpire }: Props) {
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
  return {
    timeLeft,
  };
}
