"use client";
import * as React from "react";
import { PaymentMode } from "./types";
import PaymentModeNow from "./PaymentModeNow";
import PaymentModeLater from "./PaymentModeLater";
import SelectPaymentMode from "./SelectPaymentStatus";
import ShopCardInfo from "./ShopCartInfo";
import { PaymentModeInfo } from "./PaymentModeInfo";
import PaymentSuccess from "./PaymentSuccess";
import { CardToCardPaymentInfo } from "@/types/order";
import PaymentExpireAlert from "./PaymentExpireAlert";

type Props = {
  open: boolean;
  onClose: () => void;
  payment_id: number;
  order_id: number;
  amount: number;
  later?: boolean;
  date: string;
  paymentInfo?: CardToCardPaymentInfo | null;
};

export default function CardToCardPayment({
  payment_id,
  order_id,
  amount,
  onClose,
  later = false,
  paymentInfo = null,
  date,
}: Props) {
  const [mode, setMode] = React.useState<PaymentMode>(() =>
    paymentInfo?.sender_card_number ? "info" : "now",
  );
  const [success, setSuccess] = React.useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  };

  const modeAction: Record<PaymentMode, React.ReactNode> = {
    now: (
      <PaymentModeNow
        onClose={onClose}
        onSuccess={handleSuccess}
        payment_id={payment_id}
        receipt_image={paymentInfo?.receipt_image ?? null}
      />
    ),
    later: (
      <PaymentModeLater
        order_id={order_id}
        onClose={onClose}
        onSuccess={handleSuccess}
      />
    ),
    info: (
      <PaymentModeInfo
        onClose={onClose}
        onSuccess={handleSuccess}
        payment_id={payment_id}
        values={paymentInfo}
      />
    ),
  };

  if (success)
    return (
      <PaymentSuccess
        onClose={onClose}
        date={date}
        paymentMode={mode}
        later={later}
        order_id={order_id}
      />
    );

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-medium">پرداخت کارت به کارت</h3>
        <p className="text-sm leading-7 text-muted mt-4">
          لطفا مبلغ سفارش را با اطلاعات زیر به حساب فروشگاه واریز کنید و تصویر
          رسید آن را بارگذاری کنید.
        </p>
      </div>
      <PaymentExpireAlert date={date} />
      <div className="lg:flex space-y-4 gap-4">
        <div className="lg:w-1/2 space-y-4 flex flex-col justify-between h-full m-0">
          <ShopCardInfo amount={Number(amount)} />
          <SelectPaymentMode later={later} mode={mode} setMode={setMode} />
        </div>

        <div className="lg:w-1/2">{modeAction[mode]}</div>
      </div>
    </div>
  );
}
