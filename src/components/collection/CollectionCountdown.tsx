"use client";

import { useEffect, useState } from "react";

function remaining(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
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
    <div className="flex gap-2">
      {Object.entries(time).map(([k, v]) => (
        <div
          key={k}
          className="min-w-[52px] rounded-lg bg-muted px-2 py-1 text-center"
        >
          <div className="font-bold">{v}</div>
          <div className="text-xs text-muted-foreground">
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
