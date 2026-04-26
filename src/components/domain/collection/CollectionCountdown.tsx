"use client";

import { useEffect, useState } from "react";

function remaining(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    s: Math.floor((diff / 1000) % 60),
    m: Math.floor((diff / 60000) % 60),
    h: Math.floor((diff / 3600000) % 24),
    d: Math.floor(diff / 86400000),
  };
}

export default function CollectionCountdown({ endDate }: { endDate: string }) {
  const [time, setTime] = useState(() => remaining(endDate));

  useEffect(() => {
    const t = setInterval(() => {
      setTime(remaining(endDate));
    }, 1000);
    return () => clearInterval(t);
  }, [endDate]);

  if (!time)
    return <span className="text-sm text-destructive">پایان کمپین</span>;

  return (
    <div className="flex flex-row-reverse justify-end gap-2">
      {(Object.entries(time)).reverse().map(([k, v]) => (
        <div
          key={k}
          className="min-w-[52px] rounded-md bg-white p-2 px-3 text-center"
        >
          <div className="font-bold text-gray-800">{v.toLocaleString("fa")}</div>
          <div className="text-xs text-gray-800">
            {k === "d"
              ? "روز"
              : k === "h"
                ? "ساعت"
                : k === "m"
                  ? "دقیقه"
                  : "ثانیه"}
          </div>
        </div>
      ))}
    </div>
  );
}
