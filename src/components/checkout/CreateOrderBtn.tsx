"use client";
import { createOrder, useCheckout } from "@/queries/orders";
import { createPayment } from "@/queries/payment";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import LoaderDots from "../common/LoaderDots";
import { Dialog, DialogContent } from "../ui/dialog";
import CardToCardPaymentModal from "./CardToCardPaymentModal";
import { PaymentMethod } from "@/types";
import { Button } from "../ui/button";

export default function CreateOrderBtn() {
  const [openModal, setOpenModal] = useState<PaymentMethod | null>(null);
  const {
    orderMeta: { address, code, note, payment_method },
  } = useCheckout();
  const {
    mutate: createOrderHandle,
    isPending,
    isSuccess,
    data: orderData,
  } = useMutation(createOrder);
  const {
    mutate: createPaymentHandle,
    isPending: paymentPending,
    isSuccess: paymentSuccess,
    data: paymentData,
  } = useMutation(createPayment);
  const handleCreateOrder = () => {
    createOrderHandle({ code, addressId: address?.id || 0, note });
  };

  useEffect(() => {
    if (isSuccess && orderData) {
      if (payment_method === "cartToCart") return setOpenModal("cartToCart");

      if (payment_method === "zarinpal") {
        setOpenModal("zarinpal");
        createPaymentHandle({
          order_id: orderData?.id,
          callback: "http://localhost:3000/verify",
        });
      }
    }
  }, [isSuccess, createPaymentHandle, setOpenModal, orderData, payment_method]);

  useEffect(() => {
    if (paymentSuccess) location.href = paymentData.payment_url;
  }, [paymentSuccess, paymentData]);
  return (
    <>
      <Button
        isLoading={isPending}
        onClick={handleCreateOrder}
        className="w-full mt-4"
      >
        پرداخت و تکمیل سفارش
      </Button>

      <CardToCardPaymentModal
        onClose={() => setOpenModal(null)}
        cardNumber="6037998156570581"
        open={openModal === "cartToCart"}
      />
      <Dialog open={paymentPending}>
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
