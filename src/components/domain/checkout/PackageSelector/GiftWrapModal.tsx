"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BaseDialog from "@/components/common/BaseDialog";
import useCheckout from "@/hooks/useCheckout";
import { Check, Edit2Icon, LucidePlus } from "lucide-react";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { cn } from "@/lib/utils/classnames";
import { formatToman } from "@/lib/utils/price";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  is_gift: boolean;
  onHandleSelectGift: (val: boolean) => void;
};

export function GiftWrapModal({
  onOpenChange,
  open,
  is_gift,
  onHandleSelectGift,
}: Props) {
  const { data } = useQuery(getGiftWrappings);
  const {
    orderMeta: { gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();

  const handleSelectPack = (selectedId: number) => {
    handleSetOrderMeta({ gift_wrapping_id: selectedId });
    onHandleSelectGift(true);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (!gift_wrapping_id) {
      handleSetOrderMeta({ is_gift: false });
    }
    onOpenChange(false);
  };

  return (
    <BaseDialog
      title={is_gift ? "ویرایش انتخاب" : "انتخاب بسته بندی"}
      open={open}
      onOpenChange={onOpenChange}
      content={
        <div className="relative">
          <div className="md:max-h-[70vh] pb-16 overflow-auto no-scrollbar space-y-2">
            {data
              ?.filter((i) => i.is_active && i.is_for_gift)
              .map((item, index) => (
                <div
                  role="button"
                  key={index}
                  onClick={() => handleSelectPack(item.id)}
                  className={cn(
                    "border relative flex items-stretch cursor-pointer rounded-lg overflow-hidden hover:border-muted-500 transition",
                    gift_wrapping_id === item.id &&
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

                  {gift_wrapping_id === item.id && (
                    <Check className="absolute left-3 top-3 text-green-600" />
                  )}
                </div>
              ))}
          </div>
        </div>
      }
      trigger={
        <div className="flex items-center gap-1 text-primary-500 cursor-pointer hover:text-primary-600 transition-all">
          {!is_gift ? (
            <LucidePlus className="size-4" />
          ) : (
            <Edit2Icon className="size-4" />
          )}
          <span className="font-medium text-sm">
            {!is_gift ? "افزودن" : ""}
          </span>
        </div>
      }
      hiddenFooter
    />
  );
}
