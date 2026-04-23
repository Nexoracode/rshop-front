"use client";

import GiftMessageInput from "./GiftMessageInput";
import useCheckout from "@/hooks/useCheckout";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { GiftWrapModal } from "./GiftWrapModal";

export function PackageSelector() {
  const {
    orderMeta: { is_gift = false, gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();
  const { data } = useQuery(getGiftWrappings);

  if (!data?.length) return null;

  console.log(is_gift, gift_wrapping_id);

  return (
    <>
      <GiftWrapModal
        is_gift={is_gift}
        onHandleSelectGift={(giftID) => console.log(giftID)}
      />
      {is_gift ? <GiftMessageInput /> : ""}
    </>
  );
}
