"use client";

import React from "react";
import DiscountField from "./DiscountForm";
import AddressSelector from "./AddressSelector";
import CartSummary from "./CartSummery";
import OrderNote from "./OrderNote";

import { PackageSelector } from "./PackageSelector";
import QueryClientWrapper from "@/components/layout/QueryClientWrapper";
import UserInfo from "./UserInfo";
import SectionTitle from "@/components/common/SectionTitle";

export default function CheckoutForm() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row md:items-start gap-5">
        <div className="w-full flex-1 space-y-6 mt-6">
          <SectionTitle title="تکمیل سفارش" />

          <UserInfo />

          <AddressSelector />

          <PackageSelector />

          <OrderNote />
        </div>

        <CartSummary>
          <DiscountField />
        </CartSummary>
      </div>
    </div>
  );
}
