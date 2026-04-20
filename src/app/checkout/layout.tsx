"use client";

import CartPageHeader from "@/components/domain/cart/CartPageHeader";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CartPageHeader />
      {children}
    </div>
  );
};

export default CheckoutLayout;
