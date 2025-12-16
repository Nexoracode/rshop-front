import { AlertTriangle } from "lucide-react";
import React from "react";

export default function PaymentModeLater() {
  return (
    <div className="flex items-start gap-3 rounded-xl border p-3 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
      <AlertTriangle className="size-5 shrink-0 mt-0.5" />
      <p className="text-sm leading-6">
        فرصت پرداخت <span className="font-semibold">محدود</span> است و ممکن است
        موجودی محصول به اتمام برسد. لطفاً در اولین فرصت از پنل کاربری اقدام
        کنید.
      </p>
    </div>
  );
}
