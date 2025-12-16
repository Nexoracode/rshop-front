"use client";

import { formatToman } from "@/lib/utils";
import CreateOrderBtn from "./CreateOrderBtn";
import { Card } from "../ui/card";
import CartSummeryInfo from "./CartSummeryProducts";
import CartSummeryProducts from "./CartSummeryInfo";
import Responsive from "../common/Responsive";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart";

export default function CartSummary() {
  const { data } = useQuery(getCart);
  const couponData = useMutationState({
    filters: { mutationKey: ["check-promotion"], status: "success" },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (mu) => mu.state.data as any,
  })[0];
  return (
    <Card className="p-3  fixed md:!sticky md:top-24 bottom-0 left-0 right-0 md:w-[20rem] md:bg-transparent z-50 md:z-[unset] rounded-none md:rounded-lg">
      <div className="md:space-y-3 space-y-1">
        <Responsive visible="desktop">
          <CartSummeryInfo />

          <CartSummeryProducts />
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
    </Card>
  );
}
