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
    <div className="border-b pb-6 mt-6 space-y-4" dir="rtl">
      <div className="flex items-stretch gap-4">
        <div className="relative w-20 h-20 bg-muted/5 rounded-md overflow-hidden">
          <Image
            src={selectedItem?.image?.url || "/gift.png"}
            alt={selectedItem?.name || "بسته‌بندی هدیه"}
            fill
            className="object-cover rounded-md p-2"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="font-semibold text-sm">{selectedItem?.name}</div>
          <div className=" text-sm text-muted/70">
            {selectedItem?.description}
          </div>
          <div className="text-gray-600 font-semibold text-sm">
            {formatToman(Number(selectedItem?.price || 0))}
          </div>
        </div>
      </div>
    </div>
  );
}
