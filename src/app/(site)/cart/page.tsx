import AwaitingPayments from "@/components/domain/cart/AwaitingPayments";
import CartItemsList from "@/components/domain/cart/CartItemsList";
import RecentView from "@/components/domain/cart/RecentView";
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
