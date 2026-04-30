"use client";
import LoaderDots from "@/components/common/LoaderDots";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import React from "react";

type Props = {
  qty?: number;
  maxQty?: number;
  onChange?: (qty: number) => void;
  loading?: boolean;
};

export default function QuantitySelect({
  qty = 1,
  maxQty = 999,
  onChange,
  loading,
}: Props) {
  const handleIncrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (maxQty >= qty + 1) {
      onChange?.(qty + 1);
    }
  };
  const handleDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(qty! > 1 ? qty! - 1 : 0);
  };

  return (
    <div className="inline-flex items-center justify-between rounded-md p-0.5 border bg-background w-[96px] h-[38px]">
      <Button
        type="button"
        variant={"text-nohover"}
        size={"sm"}
        className="px-2"
        onClick={handleIncrease}
        aria-label="افزایش تعداد"
      >
        <Plus
          size={18}
          className={
            maxQty && qty === maxQty
              ? "rotate-45 !text-slate-400 cursor-default"
              : ""
          }
        />
      </Button>
      {loading ? (
        <span>
          <LoaderDots count={3} size={3} />
        </span>
      ) : (
        <div className="flex flex-col items-center">
          <input
            inputMode="numeric"
            value={qty}
            disabled
            /* onChange={(e) => {
              const v = Number(e.target.value || 1);
              const next = Number.isFinite(v) && v > 0 ? Math.floor(v) : 1;
              onChange?(qty + 1)(Math.max(1, Math.min(next, maxQty)));
            }} */
            className={`w-6 text-center -mb-1 bg-transparent focus:outline-none ${maxQty && qty === maxQty ? "text-red-500" : "text-primary-500"}`}
            aria-label="تعداد"
          />
          {qty === maxQty ? (
            <span className="text-[9px] text-gray-400 font-semibold">
              حداکثر
            </span>
          ) : (
            ""
          )}
        </div>
      )}
      <Button
        type="button"
        variant={"text-nohover"}
        className="px-2"
        size={"sm"}
        onClick={handleDecrease}
        aria-label="کاهش تعداد"
      >
        {qty === 1 ? (
          <Trash2Icon size={16} className="text-slate-500" />
        ) : (
          <Minus size={18} />
        )}
      </Button>
    </div>
  );
}
