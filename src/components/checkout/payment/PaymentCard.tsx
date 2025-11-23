"use client";

import { formatToman } from "@/lib/utils";

import { useMutationState, useQuery } from "@tanstack/react-query";
import { getCart } from "@/queries/cart";
import { Card } from "@/components/ui/card";
import Responsive from "@/components/common/Responsive";
import CartSummeryInfo from "../CartSummeryInfo";
import CreatePaymentBtn from "./CreatePaymentBtn";

export default function PaymentCard() {
  const { data } = useQuery(getCart);
  const couponData = useMutationState({
    filters: { mutationKey: ["discount-code"], status: "success" },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (mu) => mu.state.data as any,
  })[0];
  return (
    <Card className="p-3  fixed md:!sticky md:top-24 bottom-0 left-0 right-0 md:w-[20rem] md:bg-transparent z-50 md:z-[unset] rounded-none md:rounded-lg">
      <div className="md:space-y-3 space-y-1">
        <Responsive visible="desktop">
          <CartSummeryInfo />
        </Responsive>
        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-1">
            <CreatePaymentBtn />
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
