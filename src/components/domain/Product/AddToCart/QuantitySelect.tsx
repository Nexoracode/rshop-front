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

  console.log({ qty, maxQty });
  return (
    <div className="flex gap-2 items-center">
      <div className="inline-flex shadow items-center rounded-lg border bg-background">
        <Button
          type="button"
          variant={"text-nohover"}
          size={"sm"}
          className="px-2"
          onClick={handleIncrease}
          aria-label="افزایش تعداد"
        >
          <Plus size={18} />
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
              className="w-6 text-center bg-transparent focus:outline-none"
              aria-label="تعداد"
            />
            {maxQty && qty === maxQty && (
              <span className="text-danger text-xs">حداکثر</span>
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
          {qty === 1 ? <Trash2Icon size={18} /> : <Minus size={18} />}
        </Button>
      </div>
    </div>
  );
}
