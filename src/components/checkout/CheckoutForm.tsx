import React from "react";
import DiscountField from "./DiscountForm";
import { Card } from "../ui/card";
import PaymentMethodSelector from "./PaymentMethod";
import AddressSelector from "./AddressSelector";
import CartSummary from "./CartSummery";
import OrderNote from "./OrderNote";
import Responsive from "../common/Responsive";
import CartSummeryInfo from "./CartSummeryProducts";
import CartSummeryProducts from "./CartSummeryInfo";
import SectionTitle from "../common/SectionTitle";
import QueryClientWrapper from "../layout/QueryClientWrapper";

export default function CheckoutForm() {
  return (
    <div className="min-h-screen space-y-5">
      <QueryClientWrapper>
        <SectionTitle title="تکمیل سفارش" />
        <div className="flex items-start gap-5">
          <div className="flex-1 space-y-5">
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
