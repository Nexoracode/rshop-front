"use client";

import { formatPriceCompactFa } from "@/lib/utils";

import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmptyCard } from "@/components/common/EmptyCart";
import CartListItems from "./CartListItems";
import CartSummery from "./CartSummery";

export default function CartPopover() {
  const { data: cart } = useCart();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative group flex items-center"
          aria-label="سبد خرید"
        >
          <ShoppingCart size={24} className="text-foreground" />
          <span className="font-light pr-1 text-sm">
            <span className="bg-white text-primary p-1 rounded-full inline-block leading-2 min-w-7">
              {cart?.total_quantity ?? 0}
            </span>{" "}
            <br /> {formatPriceCompactFa(cart?.total ?? 0)}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="!w-md">
        <div className="space-y-3 relative">
          {cart?.items_count === 0 ? (
            <EmptyCard />
          ) : (
            <>
              <CartListItems />
              <CartSummery />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
