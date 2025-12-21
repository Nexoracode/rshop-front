import React from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Check, ChevronLeft } from "lucide-react";
import Image from "../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Button } from "../ui/button";

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
    <Card className="flex p-3 gap-2 flex-col justify-between ">
      <div className="flex text-success font-semibold items-center">
        <Check />
        <p>محصول به سبد خرید اظافه شد.</p>
      </div>
      <div className="flex">
        <Image
          width={48}
          height={48}
          src={productImage || PRODUCT_PLACEHOLDER}
          alt=""
          className="object-center w-[3rem] h-[3rem] aspect-square border rounded-md"
        />
        <div className="flex flex-1 pr-2 items-center">
          <p className="text-xs font-semibold line-clamp-2 leading-7">
            {productName}
          </p>
        </div>
      </div>
      <div className="flex justify-end flex-1 gap-2">
        <Button
          size={"sm"}
          color="info"
          className="px-0 gap-1 text-sm font-semibold"
          variant={"text-nohover"}
          onClick={() => toast.dismiss(t)}
        >
          ادامه خرید
        </Button>
        <Button
          size={"sm"}
          className="px-0 gap-1 text-sm font-semibold"
          variant={"text-nohover"}
          endIcon={<ChevronLeft className="size-4" />}
        >
          مشاهده سبد خرید
        </Button>
      </div>
    </Card>
  );
}
