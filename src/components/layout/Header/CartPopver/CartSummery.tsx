"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";

export default function CartSummery() {
  const { data: cart } = useCart();
  return (
    <div className="w-full p-3 space-y-3">
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
      <div className="grid grid-cols-2 gap-3 border-t pt-3">
        <Button href="/cart" variant={"outline"}>
          {" "}
          مشاهده سبد
        </Button>
        <Button href="/checkout">تسویه حساب</Button>
      </div>
    </div>
  );
}
