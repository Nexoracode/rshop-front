import React from "react";
import CountdownTimer from "./CountdownTimer";
import ClientOnly from "../common/ClientOnly";

export default function ProductFeaturedBanner() {
  return (
    <div className="flex items-center justify-between bg-danger/10 p-3 rounded-sm">
      <span className="inline-block flex-1 w-full text-danger font-extrabold text-sm">
        پیشنهاد شگفت انگیز
      </span>

      <div>
        <ClientOnly>
          <CountdownTimer
            targetDate={new Date(Date.now() + 24 * 3600 * 1000)}
          />
        </ClientOnly>
      </div>
    </div>
  );
}
