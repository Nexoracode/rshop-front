import CheckoutForm from "@/components/checkout/CheckoutForm";
import AuthWarpper from "@/components/common/AuthWarpper";
import React from "react";

export default function CheckoutPage() {
  return (
    <div className="container my-10 space-y-20">
      <AuthWarpper>
        <CheckoutForm />
      </AuthWarpper>
    </div>
  );
}
