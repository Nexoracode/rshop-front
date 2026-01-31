"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { SelectedGiftWrapCard } from "./SelectedGiftWrapCard";
import { GiftMessageInput } from "./GiftMessageInput";
import { GiftWrapModal } from "./GiftWrapModal";
import useCheckout from "@/hooks/useCheckout";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/orders";

export function PackageSelector() {
  const {
    orderMeta: { is_gift = false, gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();
  const [giftModal, setGiftModal] = useState(false);

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

  return (
    <Card className="p-3 bg-transparent">
      <div className="space-y-4" dir="rtl">
        <h3 className="text-lg font-semibold">نوع بسته‌بندی</h3>

        <div className="grid gap-4 sm:grid-cols-1`">
          <Card
            onClick={() => handleSelectGift(true)}
            className={`!p-2 gap-0 cursor-pointer border relative ${
              is_gift ? "border-green-500 shadow" : "hover:border-gray-300"
            }`}
          >
            {is_gift && (
              <Check className="absolute left-3 top-3 text-green-600" />
            )}
            <div className="flex items-center">
              <div
                className={cn(
                  "w-5 h-5 border-2 p-0.5 rounded-full ",
                  is_gift && "border-success"
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
        </div>
        <div className="space-y-4" dir="rtl">
          {is_gift && gift_wrapping_id && (
            <>
              <SelectedGiftWrapCard onEdit={() => setGiftModal(true)} />

              {/* فیلد متن شخصی‌سازی */}
              <GiftMessageInput />
            </>
          )}

          <GiftWrapModal open={giftModal} onOpenChange={handleSetGiftModal} />
        </div>
      </div>
    </Card>
  );
}
