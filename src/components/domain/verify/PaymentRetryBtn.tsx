"use client";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import TransferToGate from "../checkout/payment/TransferToGate";
import { createPayment } from "@/queries/checkout/payment/payment";
import { Button } from "@/components/ui/button";

type Props = {
  order_id: number;
};

export default function PaymentRetryBtn({ order_id }: Props) {
  const {
    mutate: createPaymentHandle,
    isPending,
    isSuccess,
    data: paymentData,
  } = useMutation(createPayment);

  useEffect(() => {
    if (isSuccess) location.href = paymentData.payment_url;
  }, [isSuccess, paymentData]);

  const handlePayment = () => {
    createPaymentHandle({
      order_id: order_id,
      callback: `${window.location.origin}/verify`,
    });
  };

  return (
    <React.Fragment>
      <Button className="w-full" onClick={handlePayment} isLoading={isPending}>
        پرداخت دوباره
      </Button>

      <TransferToGate open={isSuccess} />
    </React.Fragment>
  );
}
