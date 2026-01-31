"use client";
import CardToCardPayment from "@/components/checkout/CardToCardPayment";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { CardToCardPaymentInfo } from "@/types/order";
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
            onClose={() => setOpen(false)}
            later
            {...props}
          />
        }
      />
    </div>
  );
}
