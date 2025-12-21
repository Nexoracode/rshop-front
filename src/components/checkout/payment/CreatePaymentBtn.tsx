"use client";
import { createPayment } from "@/queries/payment";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoaderDots from "@/components/common/LoaderDots";
import useCheckout from "@/hooks/useCheckout";
import { createCardToCardPayment } from "@/queries/orders";
import CardToCardPayment from "@/components/checkout/CardToCardPayment";
import { PaymentMethod } from "@/types/order";

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
      <Dialog open={isPending}>
        <DialogContent showCloseButton={false} className="w-full max-w-sm">
          <div className="w-full py-6 space-y-16 flex flex-col justify-center">
            <p className="text-2xl text-primary text-center">
              در حال انتقال به درگاه
            </p>

            <LoaderDots
              size={14}
              color="text-primary"
              className="inline-block w-auto"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
