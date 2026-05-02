import CartPageHeader from "@/components/domain/cart/CartPageHeader";
import CardToCardPaymentPage from "@/components/domain/checkout/payment/CardToCardPaymentPage";
import React from "react";

export default function CardToCardPage() {
  return (
    <div>
      <CartPageHeader />
      <div className="container my-10 space-y-20">
        <CardToCardPaymentPage />
      </div>
    </div>
  );
}
