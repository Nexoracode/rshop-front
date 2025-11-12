"use client";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  onResend: () => void;
  isSuccess: boolean;
};

export default function ResendCodeCounter({ onResend, isSuccess }: Props) {
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer === 0) return;
    const handleTimer = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(handleTimer);
  }, [timer]);

  useEffect(() => {
    if (isSuccess) setTimer(120);
  }, [isSuccess]);

  const timeItem = (value: number) => (
    <span className="w-7 font-bold inline-block">
      {value.toString().padStart(2, "0")}
    </span>
  );

  return (
    <div className="text-center w-full">
      {timer > 0 ? (
        <p className="text-sm font-light text-muted-foreground">
          {timeItem(timer % 60)}:{timeItem(Math.floor(timer / 60))}
          مانده تا دریافت مجدد کد
        </p>
      ) : (
        <div className="text-sm flex justify-center items-center font-light text-muted-foreground">
          در یافت مجدد کد از طریق{" "}
          <button
            onClick={onResend}
            className="text-blue-500 font-semibold flex items-center px-2"
          >
            پیامک <ChevronLeft className="!text-lg" />
          </button>
        </div>
      )}
    </div>
  );
}
