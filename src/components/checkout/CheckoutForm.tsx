"use client";
import React from "react";
import DiscountField from "./DiscountForm";
import { Card } from "../ui/card";
import PaymentMethodSelector from "./PaymentMethod";
import AddressSelector from "./AddressSelector";
import CartSummary from "./CartSummery";
import OrderNote from "./OrderNote";

export default function CheckoutForm() {
  return (
    <div className="min-h-screen">
      <div className="flex items-start space-x-5">
        <div className="flex-1 space-y-5">
          <Card className="p-3 bg-transparent">
            <h1>تکمیل سفارش</h1>
          </Card>

          <Card className="p-3 bg-transparent">
            <AddressSelector />
          </Card>

          <Card className="p-3 bg-transparent">
            <DiscountField />

            <PaymentMethodSelector />
          </Card>

          <Card className="p-3 bg-transparent">
            <OrderNote />
          </Card>
        </div>

        <Card className="p-3 w-[20rem] bg-transparent">
          <CartSummary />
        </Card>
      </div>
    </div>
  );
}
