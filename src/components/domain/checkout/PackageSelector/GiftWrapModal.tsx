"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BaseDialog from "@/components/common/BaseDialog";
import useCheckout from "@/hooks/useCheckout";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { cn } from "@/lib/utils/classnames";
import { formatToman } from "@/lib/utils/price";

type Props = {
  open: boolean;
  onOpenChange: (v: number | null) => void;
};

export function GiftWrapModal({ open, onOpenChange }: Props) {
  const { data } = useQuery(getGiftWrappings);
  const {
    orderMeta: { gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();
  const [selected, setSelelcted] = React.useState<number | null>(
    gift_wrapping_id || null,
  );
  const handleSelectPack = () => {
    if (selected === null) return;
    handleSetOrderMeta({ gift_wrapping_id: selected });
    onOpenChange(selected);
  };

  const handleClose = (open: boolean) => {
    if (open) return;
    setSelelcted(null);
    onOpenChange(null);
  };
  return (
    <React.Fragment>
      <BaseDialog
        open={open}
        onOpenChange={handleClose}
        title="انتخاب طرح بسته بندی هدیه"
        hiddenFooter
        content={
          <div className="relative">
            <div className="md:max-h-[70vh] pb-16 overflow-auto no-scrollbar space-y-2">
              {data
                ?.filter((i) => i.is_active && i.is_for_gift)
                .map((item) => (
                  <div
                    role="button"
                    key={item.id}
                    onClick={() => setSelelcted(item.id)}
                    className={cn(
                      "border relative flex items-stretch cursor-pointer rounded-lg overflow-hidden hover:border-muted-500 transition",
                      selected === item.id &&
                        "border-green-500 bg-green-500/10",
                    )}
                  >
                    <div className="relative aspect-square w-[7rem] bg-blue-50 p-2">
                      <Image
                        src={item.image?.url || "/gift.png"}
                        alt={item.name}
                        fill
                        className="object-contain rounded-xl p-3"
                      />
                    </div>

                    <div className="p-3 flex-1 flex-col flex justify-between text-right">
                      <div className="font-medium text-muted">{item.name}</div>
                      <div className="text-xs text-muted/70">
                        {item.description}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {formatToman(Number(item.price))}
                      </div>
                    </div>

                    {selected === item.id && (
                      <Check className="absolute left-3 top-3 text-green-600" />
                    )}
                  </div>
                ))}
            </div>
            <div className="absolute bottom-0 w-full">
              <Button disabled={!selected} fullWidth onClick={handleSelectPack}>
                ثبت
              </Button>
            </div>
          </div>
        }
      />
    </React.Fragment>
  );
}
