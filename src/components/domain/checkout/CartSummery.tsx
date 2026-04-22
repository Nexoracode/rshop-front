"use client";

import CreateOrderBtn from "./CreateOrderBtn";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart/cart";
import CartSummeryProducts from "./CartSummeryProducts";
import { formatToman } from "@/lib/utils/price";
import useCheckout from "@/hooks/useCheckout";

type CartSummaryProps = {
  children: React.ReactNode;
};

const CartSummary: React.FC<CartSummaryProps> = ({ children }) => {
  const { data } = useQuery(getCart);
  const { orderMeta } = useCheckout();
  return (
    <div className="flex flex-col gap-6">
      <CartSummeryProducts />
      <div className="md:hidden flex flex-col-reverse md:flex-col bg-white p-4 md:p-0 md:bg-transparent gap-2 md:gap-6 fixed md:!sticky md:top-24 bottom-0 left-0 right-0 md:w-[20rem] z-50 md:z-[unset]">
        <div className="md:space-y-3 space-y-1 md:border border-slate-300 p-4 md:rounded-lg">
          <div className="flex justify-between gap-2 items-center">
            <div className="flex flex-1">
              <CreateOrderBtn />
            </div>
            <div className="flex md:hidden items-end flex-col  justify-between">
              <span className="text-xs text-muted">مبلغ قابل پرداخت</span>
              <span className="text-primary text-lg font-medium">
                {formatToman(
                  orderMeta.promotion_code
                    ? Number(data?.total) - orderMeta.discount_amount
                    : Number(data?.total),
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CartSummary;
