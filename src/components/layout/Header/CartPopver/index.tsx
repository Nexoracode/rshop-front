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
      className="relative !z-[100]"
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
          Icon={<img src={"/cart-new.PNG"} />}
          count={cart?.total_quantity ?? 0}
          label="سبد خرید"
          className="w-5.5 h-5.5"
        />
      )}
      {open && (
        <div className="space-y-3 bg-card left-0 p-3 rounded-lg w-sm shadow-around z-50 absolute">
          <div className="text-muted-light font-medium">
            {cart?.total_quantity} کالا
          </div>
          <CartListItems />
          <CartSummery />
        </div>
      )}
    </div>
  );
}
