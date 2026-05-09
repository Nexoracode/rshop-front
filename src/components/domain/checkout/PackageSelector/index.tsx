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
      <div className="w-full flex flex-col gap-6 px-2 py-6 sm:p-6 md:mt-3 md:pb-8">
        <GiftWrapModal />
      </div>
      {is_for_gift && <GiftMessageInput />}
    </>
  );
}
