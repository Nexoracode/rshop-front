"use client";
import { createPayment } from "@/queries/payment";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

import useCheckout from "@/hooks/useCheckout";
import { createCardToCardPayment } from "@/queries/orders";
import TransferToGate from "./TransferToGate";
import { useRouter } from "next/navigation";

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
    if (isSuccess) location.href = paymentData.payment_url;
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
        className="w-full md:mt-4"
      >
        پرداخت
      </Button>

      <TransferToGate open={isSuccess} />
    </>
  );
}
