"use client";
import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";
import { EmptyCard } from "@/components/common/EmptyCart";
import PageLoader from "@/components/common/PageLoader";

export default function CartItemsList() {
  const { data, isPending } = useQuery(getCart);

  if (isPending) return <PageLoader />;

  return (
    <div>
      <p className="text-xl hidden md:block mb-4 font-medium">سبد خرید</p>
      <div className="gap-5 flex">
        {data?.total_quantity ? null : (
          <div className="w-full flex justify-center">
            <EmptyCard />
          </div>
        )}
        <div className="flex flex-1  flex-col space-y-4">
          {data?.items.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
        </div>

        {Number(data?.total_quantity) > 0 ? <CartSummery /> : null}
      </div>
    </div>
  );
}
