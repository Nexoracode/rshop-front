"use client";
import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";
import { EmptyCard } from "@/components/common/EmptyCart";

export default function CartItemsList() {
  const { data, isPending } = useQuery(getCart);

  if (isPending || !data)
    return (
      <div className="flex gap-5">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col justify-center border border-slate-200 rounded-lg">
            <div className="w-full h-[126px] flex p-4">
              <div className="w-[100px] h-[95px] rounded-lg bg-slate-100 animate-pulse"></div>
              <div className="w-full h-full flex items-end justify-end">
                <div className="w-[90px] h-[30px] rounded-md bg-slate-100 animate-pulse"></div>
              </div>
            </div>
            <div className="border-b border-slate-100 mx-4"></div>
            <div className="w-full h-[126px] rounded-lg flex p-4">
              <div className="w-[100px] h-[95px] rounded-lg bg-slate-100 animate-pulse"></div>
              <div className="w-full h-full flex items-end justify-end">
                <div className="w-[90px] h-[30px] rounded-md bg-slate-100 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-slate-200 min-w-[350px] h-[314px] rounded-lg p-5 flex flex-col gap-4 justify-between">
          <div className="bg-slate-100 w-full h-full rounded-lg animate-pulse"></div>
          <div className="w-full bg-slate-100 !min-h-[48px] rounded-lg animate-pulse"></div>
        </div>
      </div>
    );

  return (
    <div className="gap-5 flex">
      {data?.total_quantity ? null : (
        <div className="w-full flex justify-center">
          <EmptyCard />
        </div>
      )}
      <div className="border border-slate-200 rounded-lg p-6 flex flex-1 flex-col gap-4 h-fit">
        <p className="hidden md:block text-lg font-bold mb-3">سبد خرید من</p>
        {data?.items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </div>

      {Number(data?.total_quantity) > 0 ? <CartSummery /> : null}
    </div>
  );
}
