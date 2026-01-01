import AwaitingPayments from "@/components/cart/AwaitingPayments";
import CartItemsList from "@/components/cart/CartItemsList";
import RecentView from "@/components/cart/RecentView";
import React from "react";

export default function CartPage() {
  return (
    <div className="container my-10 space-y-20">
      <AwaitingPayments />
      <CartItemsList />
      <RecentView />
    </div>
  );
}
