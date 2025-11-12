"use client";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@/components/ui/popover";
import useCart from "@/hooks/useCart";

export default function CartSummery() {
  const { data: cart } = useCart();
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="text-sm">
          <span className="">تعداد اقلام:</span>
          <span className="font-bold">{cart?.total_quantity}</span>
        </div>
        <div className="">
          <span className="">جمع کل: </span>
          <span className="font-semibold">
            {cart?.total.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t pt-2">
        <PopoverClose asChild>
          <Button href="/cart" variant={"outline"}>
            {" "}
            مشاهده سبد
          </Button>
        </PopoverClose>
        <PopoverClose asChild>
          <Button href="/checkout">تسویه حساب</Button>
        </PopoverClose>
      </div>
    </div>
  );
}
