"use client";

import CreateOrderBtn from "./CreateOrderBtn";

import { useMutationState, useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart/cart";
import CartSummeryInfo from "./CartSummeryInfo";
import CartSummeryProducts from "./CartSummeryProducts";
import { formatToman } from "@/lib/utils/price";
import Responsive from "@/components/common/Responsive";
import { Card } from "@/components/ui/card";

type CartSummaryProps = {
  children: React.ReactNode;
};

const CartSummary: React.FC<CartSummaryProps> = ({ children }) => {
  const { data } = useQuery(getCart);
  const couponData = useMutationState({
    filters: { mutationKey: ["check-promotion"], status: "success" },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (mu) => mu.state.data as any,
  })[0];
  return (
    <div className="flex flex-col-reverse md:flex-col bg-white p-4 md:p-0 md:bg-transparent gap-2 md:gap-6 fixed md:!sticky md:top-24 bottom-0 left-0 right-0 md:w-[20rem] z-50 md:z-[unset]">
      <div className="md:space-y-3 space-y-1 md:border border-slate-300 p-4 md:rounded-lg">
        <Responsive visible="desktop">
          <CartSummeryProducts />
          <CartSummeryInfo />
        </Responsive>
        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-1">
            <CreateOrderBtn />
          </div>
          <Responsive visible="mobile">
            <div className="flex md:hidden items-end flex-col  justify-between">
              <span className="text-xs text-muted">مبلغ قابل پرداخت</span>
              <span className="text-primary text-lg font-semibold">
                {formatToman(couponData ? couponData.payable : data?.total)}
              </span>
            </div>
          </Responsive>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CartSummary;
