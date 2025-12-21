import * as React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ShoppingBasket } from "lucide-react";

export function EmptyCard() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <ShoppingBasket width={180} height={180} className="text-neutral-200" />

      <p className="text-lg font-semibold">سبد خرید شما خالی است</p>

      <p className="text-muted">برای مشاهده محصولات بیشتر به صفحه زیر بروید</p>

      <Button href={"/"} fullWidth endIcon={<ArrowLeft />}>
        رفتن به فروشگاه
      </Button>
    </div>
  );
}
