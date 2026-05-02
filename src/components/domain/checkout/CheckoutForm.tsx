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
    <div className="space-y-5 ">
      <div className="flex flex-col lg:flex-row md:items-start gap-8">
        <div className="w-full flex flex-col sm:gap-8">
          <UserInfo />
          <AddressSelector />
          <div className="w-full grid sm:grid-cols-2 2xl:flex sm:gap-8">
            <OrderNote />
            <PackageSelector />
          </div>
        </div>

        <CartSummary>
          <DiscountField />
        </CartSummary>
      </div>
    </div>
  );
}
