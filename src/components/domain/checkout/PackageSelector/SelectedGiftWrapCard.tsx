import Image from "next/image";
import useCheckout from "@/hooks/useCheckout";
import { useQuery } from "@tanstack/react-query";
import { getGiftWrappings } from "@/queries/checkout/order-meta";

export function SelectedGiftWrapCard() {
  const {
    orderMeta: { gift_wrapping_id },
  } = useCheckout();

  const { data } = useQuery(getGiftWrappings);

  const selectedItem = data?.find((item) => item.id === gift_wrapping_id);

  return (
    <div className="flex items-center gap-3">
      <Image
        src={selectedItem?.image?.url || "/gift.png"}
        alt={"بسته‌بندی هدیه"}
        width={22}
        height={22}
        className="object-cover rounded-sm"
      />

      <div className="font-medium text-sm text-muted">
        {selectedItem?.name || "نام بسته بندی"}
      </div>
    </div>
  );
}
