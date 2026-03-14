"use client";

import * as React from "react";

import { CheckCircle2, XCircle, Loader2, Tag } from "lucide-react";
import useCheckPromotion from "@/hooks/useCheckPromotion";
import useCheckout from "@/hooks/useCheckout";
import { cn } from "@/lib/utils/classnames";
import FieldContainer from "@/components/common/Form/FieldContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DiscountForm() {
  const { handleCheck } = useCheckPromotion();
  const [code, setCode] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [message, setMessage] = React.useState("");
  const { handleSetOrderMeta } = useCheckout();

  const handleValidate = async () => {
    if (!code.trim()) {
      setMessage("لطفاً کد تخفیف را وارد کنید.");
      setStatus("invalid");
      return;
    }

    setMessage("");

    handleCheck(code, {
      onError(error) {
        setStatus("invalid");
        setMessage(`${error.message} ❌`);
      },
      onSuccess(data) {
        setStatus("valid");
        handleSetOrderMeta({
          promotion_code: code,
          discount_amount: data.discount,
        });
        setMessage("کد تخفیف با موفقیت اعمال شد 🎉");
      },
    });
  };

  return (
    <FieldContainer error="" label="">
      <div
        className={cn("relative w-full transition-all")}
      >
        <div className="relative flex items-center">
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus("idle");
            }}
            placeholder="درصورتی که کد تخفیف دارید وارد کنید"
            disabled={status === "loading"}
            className={cn(
              "pr-3 h-12 rounded-lg font-semibold text-sm border border-slate-300 focus-visible:ring-0",
              status === "valid" &&
                "border-green-500 focus-visible:ring-green-500",
              status === "invalid" &&
                "border-rose-500 focus-visible:ring-rose-500",
            )}
          />

          <Button
            type="button"
            size="sm"
            onClick={handleValidate}
            disabled={status === "loading" || status === "valid"}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md px-4 h-9"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "اعمال کد"
            )}
          </Button>
        </div>

        {message && (
          <p
            className={cn(
              "mt-3 text-xs font-medium",
              status === "valid"
                ? "text-green-600 dark:text-green-400"
                : status === "invalid"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-muted-foreground",
            )}
          >
            {}
          </p>
        )}
      </div>
    </FieldContainer>
  );
}
