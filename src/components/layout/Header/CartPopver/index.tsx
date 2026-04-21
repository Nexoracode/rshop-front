"use client";

import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";

import CartListItems from "./CartListItems";
import CartSummery from "./CartSummery";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import LinkWithChip from "@/components/common/LinkWithChip";

export default function CartPopover() {
  const { data: cart, isPending } = useCart();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (cart?.total_quantity) setOpen(true);
  };
  return (
    <div
      className="relative h-[40px] !z-[100] flex items-center justify-end"
      //   onMouseOut={() => setOpen(false)}
      onClick={() => setOpen(false)}
      onMouseEnter={handleOpen}
      onMouseLeave={() => setOpen(false)}
    >
      {isPending ? (
        <Skeleton className="h-8 w-16" />
      ) : (
        <LinkWithChip
          href="/cart"
          Icon={<ShoppingCart size={24} className="text-slate-700" />}
          count={cart?.total_quantity ?? 0}
          label="سبد خرید"
        />
      )}
  {/*     {open && ( */}
        <div className="bg-white top-11 z-50 left-0 rounded-lg w-[400px] h-[482px] shadow-around flex flex-col justify-between absolute pt-4 pb-5">
          <div className="text-slate-600 text-sm px-5">
            {cart?.total_quantity} کالا
          </div>
          <CartListItems />
          <CartSummery />
        </div>
      {/* )} */}
    </div>
  );
}
