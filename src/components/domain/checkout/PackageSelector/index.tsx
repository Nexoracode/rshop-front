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
      <div className="w-full flex flex-col gap-6 p-6 rounded-lg border">
        <GiftWrapModal />
      </div>
      <GiftMessageInput />
    </>
  );
}
