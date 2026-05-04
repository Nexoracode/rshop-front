import { Payment } from "@/types/order";
import React from "react";

type Props = {
  status: Payment["card_to_card_status"];
};

export default function PaymentStatusAlert({ status }: Props) {
  return <div>PaymentStatusAlert</div>;
}
