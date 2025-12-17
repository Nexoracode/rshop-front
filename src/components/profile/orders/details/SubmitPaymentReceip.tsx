"use client";
import CardToCardPayment from "@/components/checkout/CardToCardPayment";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {
  order_id: number;
  payment_id: number;
  amount: number;
};

export default function SubmitPaymentReceip(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end">
      <Button variant={"outline"} size={"sm"} onClick={() => setOpen(true)}>
        ثبت رسید پرداخت
      </Button>

      <CardToCardPayment
        open={open}
        onClose={() => setOpen(false)}
        {...props}
      />
    </div>
  );
}
