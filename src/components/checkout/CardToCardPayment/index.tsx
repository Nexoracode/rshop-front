"use client";
import * as React from "react";
import BaseDialog from "../../common/BaseDialog";
import { PaymentMode } from "./types";
import PaymentModeNow from "./PaymentModeNow";
import PaymentModeLater from "./PaymentModeLater";
import SelectPaymentMode from "./SelectPaymentStatus";
import ShopCardInfo from "./ShopCartInfo";
import { PaymentModeInfo } from "./PaymentModeInfo";
import PaymentSuccess from "./PaymentSuccess";

type Props = {
  open: boolean;
  onClose: () => void;
  payment_id: number;
  order_id: number;
  amount: number;
  later?: boolean;
};

export default function CardToCardPayment({
  open,
  payment_id,
  order_id,
  amount,
  onClose,
  later = false,
}: Props) {
  const [mode, setMode] = React.useState<PaymentMode>("now");
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
      />
    ),
    later: <PaymentModeLater onClose={onClose} onSuccess={handleSuccess} />,
    info: (
      <PaymentModeInfo
        onClose={onClose}
        onSuccess={handleSuccess}
        payment_id={payment_id}
      />
    ),
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="پرداخت کارت‌به‌کارت"
      hiddenFooter
      content={
        success ? (
          <PaymentSuccess later={later} order_id={order_id} />
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-center">
              پس از واریز وجه، نسبت به{" "}
              <span className="font-semibold">بارگذاری رسید پرداختی</span> و
              تکمیل سفارش اقدام کنید.
              {order_id ? (
                <span className="block mt-1">
                  کد سفارش:{" "}
                  <span className="font-mono font-medium">{order_id}</span>
                </span>
              ) : null}
            </div>
            <ShopCardInfo amount={Number(amount)} />

            <SelectPaymentMode later={later} mode={mode} setMode={setMode} />

            {modeAction[mode]}
          </div>
        )
      }
    />
  );
}
