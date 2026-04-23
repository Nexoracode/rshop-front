"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { SelectedGiftWrapCard } from "./SelectedGiftWrapCard";
import GiftMessageInput from "./GiftMessageInput";
import { GiftWrapModal } from "./GiftWrapModal";
import useCheckout from "@/hooks/useCheckout";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";

export function PackageSelector() {
  const [open, setOpen] = useState(false);

  const {
    orderMeta: { is_gift = false, gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();

  const { data } = useQuery(getGiftWrappings);

  if (data && data.length === 0) return null;

  const giftModal = () => {
    return (
      <GiftWrapModal
        open={open}
        onOpenChange={setOpen}
        is_gift={is_gift}
        onHandleSelectGift={(val) => handleSelectGift(val)}
      />
    );
  };

  const handleSelectGift = (is_gift: boolean) => {
    if (is_gift) {
      handleSetOrderMeta({ is_gift });
    }
  };

  const onDelete = () => {
    handleSetOrderMeta({
      gift_wrapping_id: undefined,
      gift_message: "",
      is_gift: false,
    });
  };

  return (
    <>
      {/* setGiftModal(true) edit*/}
      {/*onClick={() => handleSetOrderMeta({ note: "" })}  */}

      <div className="gap-2 items-center">
        <div className="flex items-center justify-between gap-8 mb-2">
          <div className="text-[13px] text-muted-light">بسته بندی:</div>

          {is_gift ? (
            <div className="flex items-center gap-3">
              {giftModal()}
              <div className="flex items-center gap-1 text-slate-500 cursor-pointer hover:text-red-500 transition-all">
                <Trash2Icon className="size-4" onClick={onDelete} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="font-medium text-sm text-muted">
          {is_gift ? <SelectedGiftWrapCard /> : giftModal()}
        </div>
      </div>

      {is_gift ? <GiftMessageInput /> : ""}
    </>
  );
}
