import React from "react";
import CountdownTimer from "./CountdownTimer";

export default function ProductFeaturedBanner() {
  return (
    <div className="flex items-center justify-between bg-danger/10 p-3 rounded-xl">
      <span className="inline-block flex-1 w-full text-danger font-extrabold text-sm">
        پیشنهاد شگفت انگیز
      </span>

      <div>
        <CountdownTimer targetDate={new Date(Date.now() + 24 * 3600 * 1000)} />
      </div>
    </div>
  );
}
