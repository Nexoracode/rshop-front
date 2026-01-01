"use client";
import { createPayment } from "@/queries/payment";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import useCheckout from "@/hooks/useCheckout";
import { createCardToCardPayment } from "@/queries/orders";
import CardToCardPayment from "@/components/checkout/CardToCardPayment";
import { PaymentMethod } from "@/types/order";
import TransferToGate from "./TransferToGate";

export default function CreatePaymentBtn({ order_id }: { order_id: number }) {
  const [openModal, setOpenModal] = useState<PaymentMethod | null>(null);
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
    data: cardPaymentData,
  } = useMutation(createCardToCardPayment);

  useEffect(() => {
    if (isSuccess) location.href = paymentData.payment_url;
  }, [isSuccess, paymentData]);

  useEffect(() => {
    if (cardPaymentSuccess) setOpenModal("card_to_card");
  }, [cardPaymentSuccess, cardPaymentData]);

  const handlePayment = () => {
    if (payment_method === "card_to_card") {
      createCardPaymentHandle({ order_id: order_id });
    }

    if (payment_method === "online") {
      setOpenModal("online");
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

      {cardPaymentData ? (
        <CardToCardPayment
          {...cardPaymentData}
          onClose={() => setOpenModal(null)}
          open={openModal === "card_to_card"}
        />
      ) : null}

      <TransferToGate open={isSuccess} />
    </>
  );
}
