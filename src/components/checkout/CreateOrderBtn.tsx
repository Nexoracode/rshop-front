"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useCheckout from "@/hooks/useCheckout";
import { createOrder } from "@/queries/checkout/order";

export default function CreateOrderBtn() {
  const {
    orderMeta: {
      address,
      promotion_code,
      note,
      is_gift,
      gift_message,
      gift_wrapping_id,
    },
  } = useCheckout();
  const router = useRouter();
  const {
    mutate: createOrderHandle,
    isPending,
    isSuccess,
    data: orderData,
  } = useMutation(createOrder);

  const handleCreateOrder = () => {
    createOrderHandle({
      addressId: address?.id || 0,
      note,
      code: promotion_code,
      is_gift,
      gift_message,
      gift_wrapping_id,
    });
  };

  useEffect(() => {
    if (isSuccess && orderData) {
      router.push(`/checkout/payment/${orderData.id}`);
    }
  }, [isSuccess, orderData, router]);

  return (
    <Button
      isLoading={isPending}
      onClick={handleCreateOrder}
      className="w-full md:mt-4"
    >
      تکمیل سفارش
    </Button>
  );
}
