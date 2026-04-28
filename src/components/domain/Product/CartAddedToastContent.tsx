import React from "react";
import { toast } from "sonner";
import { Check, ChevronLeft } from "lucide-react";
import Image from "../../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Button } from "../../ui/button";

type Props = {
  t: string | number;
  productImage: string | undefined;
  productName: string;
};

export default function CartAddedToastContent({
  t,
  productImage,
  productName,
}: Props) {
  return (
    <div className="flex space-y-2 border shadow-2xl rounded-lg bg-card p-6 gap-2 flex-col justify-between ">
      <div className="flex text-sm text-success font-medium items-center gap-2">
        <Check className="size-5" />
        <p>محصول به سبد خرید اظافه شد.</p>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <Image
          width={48}
          height={48}
          src={productImage || PRODUCT_PLACEHOLDER}
          alt=""
          className="object-center w-[4rem] h-[4rem] aspect-square rounded-md"
        />
        <div className="flex-1 items-center">
          <p className="text-[13px] text-slate-600 line-clamp-2 leading-7">
            {productName}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-end flex-1 gap-2 mt-3">
        <Button
          size={"sm"}
          fullWidth
          color="neutral"
          className="bg-transparent hover:bg-transparent h-[40px] text-primary-500"
          onClick={() => toast.dismiss(t)}
        >
          ادامه خرید
        </Button>
        <Button
          size={"sm"}
          fullWidth
          className="h-[40px]"
          href={"/cart"}
          endIcon={<ChevronLeft className="size-4" />}
        >
          مشاهده سبد خرید
        </Button>
      </div>
    </div>
  );
}
