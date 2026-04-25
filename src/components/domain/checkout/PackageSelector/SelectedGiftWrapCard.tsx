import Image from "next/image";
import useCheckout from "@/hooks/useCheckout";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";
import { formatToman } from "@/lib/utils/price";

export function SelectedGiftWrapCard() {
  const {
    orderMeta: { gift_wrapping_id },
  } = useCheckout();

  const { data } = useQuery(getGiftWrappings);

  const selectedItem = data?.find((item) => item.id === gift_wrapping_id);

  return (
    <div className="w-full flex items-center gap-4">
      <Image
        src={selectedItem?.image?.url || "/gift.png"}
        alt={"بسته‌بندی هدیه"}
        width={110}
        height={110}
        className="object-cover rounded-lg border"
      />

      <div className="h-full flex flex-col justify-between py-1">
        <div className="flex flex-col gap-1">
          <div className="font-medium text-[15px] text-muted">
            {selectedItem?.name || "نام بسته بندی"}
          </div>
          <div className="text-[13px] text-muted/70">
            {selectedItem?.description}
          </div>
        </div>
        <div className="text-primary-600 font-medium text-[16px]">
          {formatToman(Number(selectedItem?.price || 0))}
        </div>
      </div>
    </div>
  );
}
