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
import { Card } from "@/components/ui/card";
import Responsive from "@/components/common/Responsive";
import SectionTitle from "@/components/shared/asset/SectionTitle";
import UserInfo from "./UserInfo";

export default function CheckoutForm() {
  return (
    <div className="min-h-screen space-y-5">
      <QueryClientWrapper>
        <SectionTitle title="تکمیل سفارش" />
        <div className="flex items-start gap-5">
          <div className="flex-1 space-y-5">
            <UserInfo />

            <Card className="p-3 bg-transparent">
              <AddressSelector />
            </Card>

            <Card className="p-3 bg-transparent">
              <DiscountField />
            </Card>
            <PackageSelector />

            <Card className="p-3 bg-transparent">
              <OrderNote />
            </Card>

            <Responsive visible="mobile">
              <div className="px-4">
                <CartSummeryInfo />

                <CartSummeryProducts />
              </div>
            </Responsive>
          </div>

          <CartSummary />
        </div>
      </QueryClientWrapper>
    </div>
  );
}
