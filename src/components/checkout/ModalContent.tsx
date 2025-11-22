import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/Textarea";
import { Label } from "../ui/label";
import ImageUpload from "../common/Form/ImageUpload";
import { AlertTriangle, Copy } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import useCopyClipboard from "@/hooks/useCopyClipboard";

interface ModalContentProps {
  orderCode?: string;

  cardNumber: string;
  formattedCard: string;
  bankName?: string;
  cardHolderName?: string;
  amount?: string | number;
  currencyLabel?: string;

  mode: "now" | "later";
  setMode: (m: "now" | "later") => void;

  note: string;
  setNote: (v: string) => void;

  setFile: (f: File | null) => void;
}

export default function ModalContent({
  orderCode,
  cardNumber,
  formattedCard,
  bankName,
  cardHolderName,
  amount,
  currencyLabel = "تومان",

  mode,
  setMode,

  note,
  setNote,
  setFile,
}: ModalContentProps) {
  const { handleCopy } = useCopyClipboard();
  return (
    <div className="space-y-3">
      <div className="text-sm text-center">
        پس از واریز وجه، نسبت به{" "}
        <span className="font-semibold">بارگذاری رسید پرداختی</span> و تکمیل
        سفارش اقدام کنید.
        {orderCode ? (
          <span className="block mt-1">
            کد سفارش: <span className="font-mono font-medium">{orderCode}</span>
          </span>
        ) : null}
      </div>
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
            فرصت پرداخت <span className="font-semibold">محدود</span> است و ممکن
            است موجودی محصول به اتمام برسد. لطفاً در اولین فرصت از پنل کاربری
            اقدام کنید.
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
    </div>
  );
}
