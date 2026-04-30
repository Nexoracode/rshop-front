"use client";

import useCheckout from "@/hooks/useCheckout";
import GiftMessageInput from "./GiftMessageInput";
import { GiftWrapModal } from "./GiftWrapModal";

export function PackageSelector() {
  /*  const { data } = useQuery(getGiftWrappings); */
  const {
    orderMeta: { is_for_gift },
  } = useCheckout();

  return (
    <>
      <div className="w-full flex flex-col gap-6 border-b sm:border sm:rounded-lg px-2 py-6 sm:p-6">
        <GiftWrapModal />
      </div>
      {is_for_gift && <GiftMessageInput />}
    </>
  );
}
