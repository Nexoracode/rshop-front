"use client";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "@/components/shared/Link";
import React from "react";

export default function CartIconLink() {
  const { data } = useCart();
  return (
    <Link
      className={
        "relative w-8 h-8 flex items-center justify-center text-foreground"
      }
      href={"/cart"}
    >
      <ShoppingCart className="size-6" />
      {Boolean(data?.total_quantity) ? (
        <span className="absolute bg-primary-400 w-3.5 h-3.5 text-xs font-medium rounded -right-1 -bottom-1 text-white content-center">
          {data?.total_quantity}
        </span>
      ) : null}
    </Link>
  );
}
