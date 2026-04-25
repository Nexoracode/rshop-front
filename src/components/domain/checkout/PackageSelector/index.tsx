"use client";

import GiftMessageInput from "./GiftMessageInput";
import { GiftWrapModal } from "./GiftWrapModal";

export function PackageSelector() {
 /*  const { data } = useQuery(getGiftWrappings); */

  return (
    <>
      <div className="w-full flex flex-col gap-6 p-6 border-b sm:border sm:rounded-lg">
        <GiftWrapModal />
      </div>
      <GiftMessageInput />
    </>
  );
}
