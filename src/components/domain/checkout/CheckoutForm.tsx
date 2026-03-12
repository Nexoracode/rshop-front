"use client"

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
import UpdateUserInfo from "./UpdateUserInfo";
import Image from "@/components/common/Image";
import BackButton from "@/components/common/BackButton";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter()
  return (
    <div className="min-h-screen space-y-5">
      <div className="relative border border-slate-300 rounded-lg p-3 mb-16">
        <div onClick={() => router.back()} className="absolute cursor-pointer flex items-center gap-2 top-10 -translate-y-1/2 right-6">
          <BackButton />
            برگشت
        </div>
        <div className="w-full flex items-center justify-center">
          <Image src={"/rshop_logo_h.png"} width={100} height={45} alt="logo" />
        </div>
      </div>
      <QueryClientWrapper>
        <SectionTitle title="تکمیل سفارش" />
        <div className="flex items-start gap-5">
          <div className="flex-1 space-y-5">
            <UpdateUserInfo />

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
