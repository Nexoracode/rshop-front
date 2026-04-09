"use client";

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
    <span>{value.toString().padStart(2, "0")}</span>
  );

  return (
    <div className="w-full flex items-center justify-center gap-1.5">
      <p className="text-[13px] font-normal text-slate-600">دریافت نکردید؟</p>
      {timer > 0 ? (
        <p className="text-[13px] font-normal text-primary-500 flex items-center justify-end">
          {timeItem(timer % 60)}:{timeItem(Math.floor(timer / 60))}
        </p>
      ) : (
        <div
          className="text-[13px] flex justify-center items-center font-normal cursor-pointer text-sky-600"
          onClick={onResend}
        >
          ارسال مجدد
        </div>
      )}
    </div>
  );
}
