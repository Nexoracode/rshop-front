"use client";

import React from "react";
import DiscountField from "./DiscountForm";
import CartSummary from "./CartSummery";
import UserInfo from "./UserInfo";
import AddressSelector from "./AddressSelector";
import OrderNote from "./OrderNote";
import { PackageSelector } from "./PackageSelector";

export default function CheckoutForm() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row md:items-start gap-16 md:gap-4 pb-24">
        <div className="w-full flex flex-col gap-4">
          <UserInfo />
          <AddressSelector />
          <OrderNote />
          <PackageSelector />
        </div>
        <div className="px-2 -mt-8 -mb-8">
          <hr />
        </div>
        <CartSummary>
          <DiscountField />
        </CartSummary>
      </div>
    </div>
  );
}
