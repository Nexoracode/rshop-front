"use client";

import React from "react";
import DiscountField from "./DiscountForm";
import AddressSelector from "./AddressSelector";
import CartSummary from "./CartSummery";
import OrderNote from "./OrderNote";
import CartSummeryInfo from "./CartSummeryProducts";
import CartSummeryProducts from "./CartSummeryInfo";

import { PackageSelector } from "./PackageSelector";
import QueryClientWrapper from "@/components/layout/QueryClientWrapper";
import Responsive from "@/components/common/Responsive";
import SectionTitle from "@/components/shared/asset/SectionTitle";
import UserInfo from "./UserInfo";

export default function CheckoutForm() {
  return (
    <div className="min-h-screen space-y-5">
      <QueryClientWrapper>
        <SectionTitle title="تکمیل سفارش" />
        <div className="flex items-start gap-5">
          <div className="flex-1 space-y-6 mt-6">
            <UserInfo />

            <AddressSelector />

            <PackageSelector />

            <OrderNote />

            <Responsive visible="mobile">
              <div className="px-4">
                <CartSummeryInfo />

                <CartSummeryProducts />
              </div>
            </Responsive>
          </div>

          <CartSummary>
            <DiscountField />
          </CartSummary>
        </div>
      </QueryClientWrapper>
    </div>
  );
}
