"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCheckout from "@/hooks/useCheckout";
import { createOrder } from "@/queries/checkout/order";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "sonner";

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
  const { user } = useCurrentUser();

  const isProfileComplete = () => {
    if (!user?.first_name) {
      toast.error("جهت ثبت شفارش تکمیل اطلاعات کاربری الزامی است.");
      return false;
    }

    return true;
  };

  const handleCreateOrder = () => {
    if (isProfileComplete())
      createOrderHandle({
        addressId: address?.id || 0,
        note,
        code: promotion_code ?? null,
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
      className="w-[194px] lg:w-full"
    >
      تکمیل سفارش
    </Button>
  );
}
