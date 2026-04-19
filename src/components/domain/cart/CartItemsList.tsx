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
          <p className="text-[20px]">سبد خرید</p>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-100 w-full h-[126px] rounded-lg animate-pulse flex p-4">
              <div className="w-[100px] h-[95px] rounded-lg bg-slate-200"></div>
              <div className="w-full h-full flex items-end justify-end">
                <div className="w-[90px] h-[30px] rounded-md bg-slate-200"></div>
              </div>
            </div>
            <div className="bg-slate-100 w-full h-[126px] rounded-lg animate-pulse flex p-4">
              <div className="w-[100px] h-[95px] rounded-lg bg-slate-200"></div>
              <div className="w-full h-full flex items-end justify-end">
                <div className="w-[90px] h-[30px] rounded-md bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 min-w-[315px] h-[268px] rounded-lg animate-pulse mt-11 p-5 flex items-end">
          <div className="w-full bg-slate-200 h-[48px] rounded-lg"></div>
        </div>
      </div>
    );

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
