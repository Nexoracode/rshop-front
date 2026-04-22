"use client";

import CreateOrderBtn from "./CreateOrderBtn";
import CartSummeryProducts from "./CartSummeryProducts";
import CartSummery from "../cart/CartSummery";

type CartSummaryProps = {
  children: React.ReactNode;
};

const CartSummary: React.FC<CartSummaryProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-6">
      <CartSummeryProducts />
      <div className="md:hidden">
        <CartSummery
          footer={<CreateOrderBtn />}
          showRules
        />
      </div>
      {children}
    </div>
  );
};

export default CartSummary;
