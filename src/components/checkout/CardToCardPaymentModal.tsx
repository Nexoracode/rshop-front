"use client";
import * as React from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import BaseDialog from "../common/BaseDialog";
import ModalContent from "./ModalContent";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
// If you're using shadcn's toast hook

// ---- Types ----
type Props = {
  open: boolean;
  onClose: () => void;
  cardNumber: string; // e.g. "6219861098765432"
  bankName?: string;
  cardHolderName?: string;
  amount?: number | string; // optional info to show user (formatted outside or inside)
  currencyLabel?: string; // e.g. "تومان"
  orderCode?: string; // to reference the order in description
  onUploadNow?: (payload: {
    file: File;
    note?: string;
  }) => Promise<void> | void;
  onDefer?: () => void; // user chooses to pay later
};

export default function CardToCardPaymentModal({
  open,
  onClose,
  cardNumber,
  bankName,
  amount,
  onUploadNow,
  onDefer,
}: Props) {
  const [mode, setMode] = React.useState<"now" | "later">("now");
  const [file, setFile] = React.useState<File | null>(null);
  const [note, setNote] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (!open) {
      // reset internal state when closing
      setMode("now");
      setNote("");
      setSubmitting(false);
    }
  }, [open]);

  const formattedCard = React.useMemo(
    () => formatCardNumber(cardNumber),
    [cardNumber]
  );

  const handleSubmit = async () => {
    if (mode === "later") {
      toast.info("یادآوری پرداخت", {
        description:
          "فرصت پرداخت محدود است و ممکن است موجودی محصول به‌زودی تمام شود. از پنل کاربری رسید را بارگذاری کنید.",
      });
      onClose();
      onDefer?.();
      router.push("/profile/orders");
      return;
    }

    if (!file) {
      toast.error("لطفاً رسید را بارگذاری کنید");
      return;
    }

    try {
      setSubmitting(true);
      await onUploadNow?.({ file, note });
      toast.success("رسید با موفقیت ارسال شد");
      router.push("/profile/orders");
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("ارسال ناموفق", {
        description: err?.message || "مجدد تلاش کنید",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={(op) => {
        if (!op) onClose();
      }}
      title="پرداخت کارت‌به‌کارت"
      footer={
        <div className="w-full">
          <Separator />

          <div className="flex pt-2 flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <div className="text-xs text-muted-foreground">
              با انتخاب «تأیید»، دستورالعمل‌های فوق را می‌پذیرید.
            </div>
            <div className="flex gap-2 sm:justify-end">
              <Button fullWidth variant="text" onClick={onClose}>
                انصراف
              </Button>
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={submitting || (mode === "now" && !file)}
                isLoading={submitting}
              >
                تأیید
              </Button>
            </div>
          </div>
        </div>
      }
      content={
        <ModalContent
          cardNumber={cardNumber}
          formattedCard={formattedCard}
          mode={mode}
          note={note}
          setFile={setFile}
          setMode={setMode}
          setNote={setNote}
          amount={amount}
          bankName={bankName}
        />
      }
    />
  );
}

// ---- helpers ----
function formatCardNumber(value: string) {
  return (value || "")
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .split(" ")
    .reverse()
    .join(" ");
}
