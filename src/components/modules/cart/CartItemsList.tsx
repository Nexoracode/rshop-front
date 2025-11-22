"use client";
import { getCart } from "@/queries/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";

export default function CartItemsList() {
  const { data } = useQuery(getCart);
  return (
    <div className="min-h-screen gap-5 flex">
      <div className="flex flex-1  flex-col space-y-4">
        {data?.items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </div>

      <CartSummery />
    </div>
  );
}
