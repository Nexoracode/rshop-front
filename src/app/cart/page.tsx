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
        <div className="space-y-10 px-2 sm:px-0 py-4">
          <AwaitingPayments />
          <CartItemsList />
          <RecentView />
        </div>
      </div>
    </>
  );
}
