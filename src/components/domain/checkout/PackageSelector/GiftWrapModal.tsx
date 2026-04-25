"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import BaseDialog from "@/components/common/BaseDialog";
import useCheckout from "@/hooks/useCheckout";
import { Check, Edit2Icon, LucidePlus, Trash2Icon } from "lucide-react";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { cn } from "@/lib/utils/classnames";
import { formatToman } from "@/lib/utils/price";
import { SelectedGiftWrapCard } from "./SelectedGiftWrapCard";
import EmptySectionCheckout from "../EmptySectionCheckout";

export function GiftWrapModal() {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(getGiftWrappings);
  const {
    orderMeta: { is_gift = false, gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();

  const handleSelectPack = (selectedId: number) => {
    handleSetOrderMeta({ gift_wrapping_id: selectedId, is_gift: true });
    setOpen(false);
  };

  const onDelete = () => {
    handleSetOrderMeta({
      gift_wrapping_id: undefined,
      gift_message: "",
      is_gift: false,
    });
  };

  const GiftModal = () => {
    return (
      <BaseDialog
        title={is_gift ? "ویرایش انتخاب" : "انتخاب بسته بندی"}
        open={open}
        onOpenChange={setOpen}
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
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full flex items-center justify-between gap-8">
        <div className="text-sm text-muted-light">بسته بندی</div>
        <div className="flex items-center gap-4">
          {GiftModal()}
          {is_gift ? (
            <div className="flex items-center gap-1 text-slate-500 cursor-pointer hover:text-red-500 transition-all">
              <Trash2Icon className="size-4" onClick={onDelete} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {is_gift ? <SelectedGiftWrapCard /> : <EmptySectionCheckout />}
    </div>
  );
}
