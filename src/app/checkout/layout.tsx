"use client";

import BackButton from "@/components/common/BackButton";
import Image from "@/components/common/Image";
import CartPageHeader from "@/components/domain/cart/CartPageHeader";
import { useRouter } from "next/navigation";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div>
      <CartPageHeader />
      {children}
    </div>
  );
};

export default CheckoutLayout;
