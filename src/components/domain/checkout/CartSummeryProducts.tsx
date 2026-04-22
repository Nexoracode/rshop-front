"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart/cart";
import { Skeleton } from "@/components/ui/skeleton";
import CartItem from "@/components/layout/Header/CartPopver/CartItem";
import CreateOrderBtn from "./CreateOrderBtn";
import CartSummery from "../cart/CartSummery";

export default function CartSummeryProducts() {
  const { data, isFetching } = useQuery(getCart);

  if (isFetching || !data) {
    return <Skeleton />;
  }

  return (
    <div
      className={`bg-white lg:border border-slate-200 rounded-lg w-full lg:w-[350px] h-full lg:h-[692px] flex flex-col justify-between lg:pt-4 lg:pb-5 transition-all`}
    >
      <div className="text-slate-600 text-sm px-5">
        {data?.total_quantity} کالا
      </div>

      <div className="px-5 md:overflow-y-auto scrollbar-custom">
        {data?.items.map((item) => (
          <CartItem key={item.id} {...item} loading={false} />
        ))}
      </div>
      <div className="hidden lg:block">
        <CartSummery footer={<CreateOrderBtn />} className="!pb-2 !border-x-0 !border-b-0 mx-1"/>
      </div>
    </div>
  );
}
