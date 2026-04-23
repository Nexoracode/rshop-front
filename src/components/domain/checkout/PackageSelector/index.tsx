"use client";

import GiftMessageInput from "./GiftMessageInput";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { GiftWrapModal } from "./GiftWrapModal";

export function PackageSelector() {
  const { data } = useQuery(getGiftWrappings);

  if (!data?.length) return null;

  return (
    <>
      <GiftWrapModal />
      <GiftMessageInput />
    </>
  );
}
