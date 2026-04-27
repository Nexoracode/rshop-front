"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

import useCheckout from "@/hooks/useCheckout";
import TransferToGate from "./TransferToGate";
import { useRouter } from "next/navigation";
import { createPayment } from "@/queries/checkout/payment/payment";
import { createCardToCardPayment } from "@/queries/checkout/payment/card-to-card";

export default function CreatePaymentBtn({ order_id }: { order_id: number }) {
  const router = useRouter();
  const {
    orderMeta: { payment_method },
  } = useCheckout();

  const {
    mutate: createPaymentHandle,
    isPending,
    isSuccess,
    data: paymentData,
  } = useMutation(createPayment);

  const {
    mutate: createCardPaymentHandle,
    isPending: cardPaymentPending,
    isSuccess: cardPaymentSuccess,
  } = useMutation(createCardToCardPayment);

  useEffect(() => {
    if (isSuccess) {}
      
    // location.href = paymentData.payment_url;
  }, [isSuccess, paymentData]);

  useEffect(() => {
    if (cardPaymentSuccess)
      router.push(`/checkout/payment/${order_id}/card_to_card`);
  }, [cardPaymentSuccess, router, order_id]);

  const handlePayment = () => {
    if (payment_method === "card_to_card") {
      createCardPaymentHandle({ order_id: order_id });
    }

    if (payment_method === "online") {
      createPaymentHandle({
        order_id: order_id,
        callback: `${window.location.origin}/verify`,
      });
    }
  };
  return (
    <>
      <Button
        isLoading={isPending || cardPaymentPending}
        onClick={handlePayment}
        className="w-full"
      >
        پرداخت
      </Button>

      <TransferToGate open={isSuccess && paymentData} />
    </>
  );
}
