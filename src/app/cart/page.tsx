import AwaitingPayments from "@/components/domain/cart/AwaitingPayments";
import CartItemsList from "@/components/domain/cart/CartItemsList";
import CartPageHeader from "@/components/domain/cart/CartPageHeader";
import RecentView from "@/components/domain/cart/RecentView";
import React from "react";

export default function CartPage() {
  return (
    <>
      <CartPageHeader />
      <div className="container">
        <div className="space-y-10 p-4 mb-[110px] lg:mb-0">
          {/*  <AwaitingPayments /> */}
          <CartItemsList />
          <RecentView />
        </div>
      </div>
    </>
  );
}
