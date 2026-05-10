import * as React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export function EmptyCard() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={"/empty-cart.svg"}
        width={200}
        height={200}
        alt="image"
        className="mx-auto"
      />

      <p className="text-lg font-medium">سبد خرید شما خالی است</p>

      <p className="text-muted">برای مشاهده محصولات بیشتر به صفحه زیر بروید</p>

      <Button href={"/"} variant={"text"}>
        رفتن به فروشگاه
      </Button>
    </div>
  );
}
