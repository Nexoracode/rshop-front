import PaymentPage from "@/components/checkout/payment/PaymentPage";
import AuthWarpper from "@/components/common/AuthWarpper";
import React from "react";

export default function page() {
  return (
    <div className="container my-10 space-y-20">
      <AuthWarpper>
        <PaymentPage />
      </AuthWarpper>
    </div>
  );
}
