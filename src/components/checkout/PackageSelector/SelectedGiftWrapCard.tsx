import Image from "next/image";
import useCheckout from "@/hooks/useCheckout";
import { getGiftWrappings } from "@/queries/orders";
import { useQuery } from "@tanstack/react-query";
import { formatToman } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";

export function SelectedGiftWrapCard({ onEdit }: { onEdit: () => void }) {
  const {
    orderMeta: { gift_wrapping_id },
    handleSetOrderMeta,
  } = useCheckout();

  const { data } = useQuery(getGiftWrappings);

  const selectedItem = data?.find((item) => item.id === gift_wrapping_id);

  const onDelete = () => {
    handleSetOrderMeta({
      gift_wrapping_id: undefined,
      gift_message: "",
      is_gift: false,
    });
  };

  return (
    <div className="border rounded-lg p-4 space-y-4" dir="rtl">
      <div className="flex justify-between items-center">
        <div className="font-semibold">بسته‌بندی انتخاب‌شده</div>

        <div className="flex gap-2">
          <Button
            color="info"
            size={"sm"}
            variant={"text"}
            startIcon={<Edit2Icon className="size-5" />}
            onClick={onEdit}
          >
            <span className="hidden md:inline-block">تغییر طرح</span>
          </Button>

          <Button
            color="danger"
            variant={"text"}
            size={"sm"}
            startIcon={<Trash2Icon className="size-5" />}
            onClick={onDelete}
          >
            <span className="hidden md:inline-block">حذف بسته‌بندی</span>
          </Button>
        </div>
      </div>

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
