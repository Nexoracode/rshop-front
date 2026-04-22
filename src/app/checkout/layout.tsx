"use client";

import CartPageHeader from "@/components/domain/cart/CartPageHeader";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CartPageHeader />
      {children}
    </>
  );
};

export default CheckoutLayout;
