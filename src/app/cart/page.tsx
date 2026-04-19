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
        <div className="mt-16 space-y-10 p-4">
          {/*  <AwaitingPayments /> */}
          <CartItemsList />
          <RecentView />
        </div>
      </div>
    </>
  );
}
