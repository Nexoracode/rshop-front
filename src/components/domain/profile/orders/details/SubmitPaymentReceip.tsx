"use client";
import BaseDialog from "@/components/common/BaseDialog";
import CardToCardPayment from "@/components/domain/checkout/CardToCardPayment";
import { Button } from "@/components/ui/button";
import { getOrderDetails } from "@/queries/profile/order";
import { CardToCardPaymentInfo } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type Props = {
  order_id: number;
  payment_id: number;
  amount: number;
  paymentInfo: CardToCardPaymentInfo;
  date: string;
};

export default function SubmitPaymentReceip(props: Props) {
  const [open, setOpen] = useState(false);
  const { refetch } = useQuery(getOrderDetails(props.order_id));
  const handleClose = () => {
    setOpen(false);
    refetch();
  };
  return (
    <div className="flex justify-end">
      <BaseDialog
        trigger={
          <Button variant={"outline"} size={"sm"}>
            ثبت رسید پرداخت
          </Button>
        }
        width="4xl"
        open={open}
        hiddenFooter
        onOpenChange={setOpen}
        title="ثبت رسید پرداخت"
        content={
          <CardToCardPayment
            open={open}
            onClose={handleClose}
            later
            {...props}
          />
        }
      />
    </div>
  );
}
