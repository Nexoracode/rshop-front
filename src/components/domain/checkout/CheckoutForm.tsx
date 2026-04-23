"use client";

import React from "react";
import DiscountField from "./DiscountForm";
import CartSummary from "./CartSummery";
import UserInfo from "./UserInfo";
import SectionTitle from "@/components/common/SectionTitle";

export default function CheckoutForm() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row md:items-start gap-5">
        <div className="border p-6 rounded-lg flex flex-col gap-4">
          <SectionTitle title="تکمیل سفارش" />
          <UserInfo />
        </div>

        <CartSummary>
          <DiscountField />
        </CartSummary>
      </div>
    </div>
  );
}
