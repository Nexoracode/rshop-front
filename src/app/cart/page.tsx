import AwaitingPayments from "@/components/domain/cart/AwaitingPayments";
import CartItemsList from "@/components/domain/cart/CartItemsList";
import CartPageHeader from "@/components/domain/cart/CartPageHeader";
import RecentView from "@/components/domain/cart/RecentView";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import React from "react";

export default function CartPage() {
  return (
    <>
      <CartPageHeader />
      <div className="container pb-36 space-y-10 px-4 lg:px-0 py-4">
        <AwaitingPayments />
        <CartItemsList />
        <RecentView />
        <MobileBottomNav />
      </div>
    </>
  );
}
