"use client";
import { getCart } from "@/queries/cart";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItem from "./CartItem";
import { Card } from "@/components/ui/card";
import { formatToman } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartItemsList() {
  const { data } = useQuery(getCart);
  return (
    <div className="min-h-screen gap-5 flex">
      <div className="flex flex-1  flex-col space-y-4">
        {data?.items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </div>

      <div className="w-[300px]">
        <Card className="flex flex-col p-4">
          <div className="flex justify-between mb-2">
            <p>قیمت کالاها({data?.total_quantity})</p>
            <p>{formatToman(data?.subtotal ?? 0)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>جمع سبد خرید</p>
            <p>{formatToman(data?.total ?? 0)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>سود شما از خرید</p>
            <p>{formatToman(data?.discount_total ?? 0)}</p>
          </div>

          <div>
            <Button href="/checkout" className="w-full mt-4">
              ادامه جهت تسویه حساب
            </Button>
          </div>
        </Card>

        <div className="text-sm text-muted-foreground mt-2">
          هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالا ها از
          سبد خرید حذف می شوند
        </div>
      </div>
    </div>
  );
}
