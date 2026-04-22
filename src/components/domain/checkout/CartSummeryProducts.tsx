"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart/cart";
import CartItem from "@/components/layout/Header/CartPopver/CartItem";
import CreateOrderBtn from "./CreateOrderBtn";
import CartSummery from "../cart/CartSummery";

export default function CartSummeryProducts() {
  const { data, isFetching } = useQuery(getCart);

  if (isFetching || data) {
    return (
      <div className="lg:w-[350px] lg:h-[512px] border border-slate-200 rounded-lg flex flex-col justify-between">
        <div className="p-4 lg:p-0 flex flex-col gap-6">
          <div className="hidden lg:flex mx-4 w-[105px] mt-5 h-[20px] rounded-lg animate-pulse bg-slate-100"></div>
          <div className="flex flex-col gap-4">
            <div className="lg:mx-4 w-[105px] h-[105px] rounded-lg animate-pulse bg-slate-100"></div>
            <div className="lg:mx-4 flex items-center justify-between">
              <div className="w-[105px] h-[20px] rounded-lg animate-pulse bg-slate-100"></div>
              <div className="w-[105px] h-[20px] rounded-lg animate-pulse bg-slate-100"></div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[286px] border-t border-slate-200 rounded-lg hidden lg:flex flex-col gap-4 justify-between py-6 p-4">
          <div className="bg-slate-100 w-full h-full animate-pulse rounded-lg"></div>
          <div className="bg-slate-100 w-full min-h-[48px] animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white md:border border-slate-200 rounded-lg w-full lg:w-[350px] h-full lg:max-h-[692px] flex flex-col justify-between ${data.items.length > 1 ? "md:pt-4" : "lg:pt-4"} lg:pb-5 transition-all`}
    >
      {data.items.length > 1 ? (
        <div className="text-slate-600 text-sm px-5">
          {data?.total_quantity} کالا
        </div>
      ) : (
        ""
      )}

      <div className="px-5 md:overflow-y-auto scrollbar-custom">
        {data?.items.map((item) => (
          <CartItem key={item.id} {...item} loading={false} />
        ))}
      </div>
      <div className="hidden lg:block">
        <CartSummery
          footer={<CreateOrderBtn />}
          className="!pb-2 !border-x-0 !border-b-0 mx-1"
        />
      </div>
    </div>
  );
}
