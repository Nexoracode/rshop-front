"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Loader2, Copy, CreditCard, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "../common/Form/ImageUpload";
import { Textarea } from "../ui/Textarea";
import { useRouter } from "next/navigation";
import useCopyClipboard from "@/hooks/useCopyClipboard";
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
  cardHolderName,
  bankName,
  amount,
  currencyLabel = "تومان",
  orderCode,
  onUploadNow,
  onDefer,
}: Props) {
  const [mode, setMode] = React.useState<"now" | "later">("now");
  const [file, setFile] = React.useState<File | null>(null);
  const [note, setNote] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const { handleCopy } = useCopyClipboard();
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
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg rtl text-right">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            پرداخت کارت‌به‌کارت
          </DialogTitle>
          <DialogDescription className="leading-7">
            پس از واریز وجه، نسبت به{" "}
            <span className="font-semibold">بارگذاری رسید پرداختی</span> و تکمیل
            سفارش اقدام کنید.
            {orderCode ? (
              <span className="block mt-1">
                کد سفارش:{" "}
                <span className="font-mono font-medium">{orderCode}</span>
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        {/* Card Box */}
        <div className="rounded-2xl border bg-card/50 p-4 grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm text-muted-foreground">شماره کارت</div>
              <div className="font-mono text-lg tracking-widest ltr">
                {formattedCard}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(cardNumber, formattedCard)}
              startIcon={<Copy className="size-4 me-1" />}
            >
              کپی
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {bankName && (
              <div>
                بانک:{" "}
                <span className="text-foreground font-medium">{bankName}</span>
              </div>
            )}
            {cardHolderName && (
              <div>
                به نام:{" "}
                <span className="text-foreground font-medium">
                  {cardHolderName}
                </span>
              </div>
            )}
            {amount && (
              <div>
                مبلغ:{" "}
                <span className="text-foreground font-medium">{amount}</span>{" "}
                <span>{currencyLabel}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base">وضعیت پرداخت</Label>
          <RadioGroup
            defaultValue="now"
            value={mode}
            onValueChange={(v) => setMode(v as "now" | "later")}
            className="grid grid-cols-1 gap-3"
          >
            <label
              dir="rtl"
              className="flex items-center gap-2 rounded-xl border p-3 cursor-pointer"
            >
              <RadioGroupItem value="now" id="mode-now" />
              <div className="leading-tight">
                <div className="font-medium">پرداخت کردم و رسید دارم</div>
                <div className="text-xs text-muted-foreground">
                  رسید را همین‌جا بارگذاری کنید
                </div>
              </div>
            </label>

            <label
              dir="rtl"
              className="flex items-center gap-2 rounded-xl border p-3 cursor-pointer"
            >
              <RadioGroupItem value="later" id="mode-later" />
              <div className="leading-tight">
                <div className="font-medium">بعداً پرداخت می‌کنم</div>
                <div className="text-xs text-muted-foreground">
                  بعداً از پنل کاربری، رسید را بارگذاری کنید
                </div>
              </div>
            </label>
          </RadioGroup>
        </div>

        {mode === "later" ? (
          <div className="flex items-start gap-3 rounded-xl border p-3 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <AlertTriangle className="size-5 shrink-0 mt-0.5" />
            <p className="text-sm leading-6">
              فرصت پرداخت <span className="font-semibold">محدود</span> است و
              ممکن است موجودی محصول به اتمام برسد. لطفاً در اولین فرصت از پنل
              کاربری اقدام کنید.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Label htmlFor="receipt">بارگذاری رسید پرداختی</Label>

            {/* Dropzone-like uploader */}
            <ImageUpload onChange={setFile} />

            <div className="grid gap-2">
              <Label htmlFor="note">توضیحات (اختیاری)</Label>
              <Textarea
                id="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="توضیحی درباره پرداخت..."
              />
            </div>
          </div>
        )}

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <div className="text-xs text-muted-foreground">
            با انتخاب «تأیید»، دستورالعمل‌های فوق را می‌پذیرید.
          </div>
          <div className="flex gap-2 sm:justify-end">
            <Button variant="text" onClick={onClose}>
              انصراف
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || (mode === "now" && !file)}
            >
              {submitting && <Loader2 className="me-2 size-4 animate-spin" />}{" "}
              تأیید
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
