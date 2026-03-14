"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, Edit2Icon, Trash2Icon } from "lucide-react";
import { SelectedGiftWrapCard } from "./SelectedGiftWrapCard";
import { GiftMessageInput } from "./GiftMessageInput";
import { GiftWrapModal } from "./GiftWrapModal";
import useCheckout from "@/hooks/useCheckout";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";

export function PackageSelector() {
  const [giftModal, setGiftModal] = useState(false);

  const {
    orderMeta: { is_gift = false, gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();

  const { data } = useQuery(getGiftWrappings);

  if (data && data.length === 0) return null;

  const handleSelectGift = (is_gift: boolean) => {
    if (is_gift) {
      handleSetOrderMeta({ is_gift: true });
      setGiftModal(true);
    } else {
      handleSetOrderMeta({
        is_gift,
        gift_wrapping_id: undefined,
        gift_message: "",
      });
    }
  };

  const handleSetGiftModal = (selected: number | null) => {
    if (!selected) {
      handleSelectGift(false);
    }

    setGiftModal(false);
  };

  const onDelete = () => {
    handleSetOrderMeta({
      gift_wrapping_id: undefined,
      gift_message: "",
      is_gift: false,
    });
  };

  return (
    <div
      className={`space-y-4 ${is_gift ? "border p-6 rounded-xl" : ""}`}
      dir="rtl"
    >
      {is_gift ? (
        <div className="flex items-center justify-between gap-2">
          <p>بسته بندی انتخاب شده</p>
          <div className="flex items-center gap-2">
            <Button
              color="info"
              size={"sm"}
              className="w-10"
              variant={"outline"}
              startIcon={<Edit2Icon className="size-5" />}
              onClick={() => setGiftModal(true)}
            />
            <Button
              color="danger"
              variant={"outline"}
              size={"sm"}
              className="w-10"
              startIcon={<Trash2Icon className="size-5" />}
              onClick={onDelete}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <Card
        onClick={() => handleSelectGift(true)}
        className={`!p-4 gap-0 cursor-pointer border relative ${
          is_gift ? "!border border-green-400" : "hover:border-gray-300"
        }`}
      >
        {is_gift && <Check className="absolute left-3 top-3 text-green-600" />}
        <div className="flex items-center">
          <div
            className={cn(
              "w-5 h-5 border-2 p-0.5 rounded-full ",
              is_gift && "border-success",
            )}
          >
            {is_gift && (
              <div className="w-full h-full bg-success rounded-full"></div>
            )}
          </div>
          <div className="ps-3">
            <div className="font-semibold">بسته‌بندی هدیه</div>
            <p className="text-sm text-gray-600 mt-1">
              امکان انتخاب طرح و متن دلخواه.
            </p>
          </div>
        </div>
      </Card>
      <div className="space-y-4" dir="rtl">
        {is_gift && gift_wrapping_id && (
          <>
            <SelectedGiftWrapCard />
            <GiftMessageInput />
          </>
        )}

        <GiftWrapModal open={giftModal} onOpenChange={handleSetGiftModal} />
      </div>
    </div>
  );
}
