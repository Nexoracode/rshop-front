"use client";

import * as React from "react";
import FieldContainer from "../common/Form/FieldContainer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader2, Tag } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { couponApply, useCheckout } from "@/queries/orders";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCart from "@/hooks/useCart";

export default function DiscountForm() {
  const { mutateAsync } = useMutation(couponApply);
  const { user } = useCurrentUser();
  const { data: cart } = useCart();
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

    mutateAsync(
      {
        code: code.trim(),
        user_id: user?.id ?? 0,
        total_amount: Number(cart?.total ?? 0),
      },
      {
        onError(error) {
          setStatus("invalid");
          setMessage(`${error.message} ❌`);
        },
        onSuccess() {
          setStatus("valid");
          handleSetOrderMeta({ code });
          setMessage("کد تخفیف با موفقیت اعمال شد 🎉");
        },
      }
    );
  };

  return (
    <FieldContainer error="" label="">
      <div
        className={cn(
          "relative w-full rounded-xl border p-4 transition-all"
          /*     status === "valid"
            ? "border-green-500 bg-green-50/40 dark:bg-green-950/30"
            : status === "invalid"
            ? "border-rose-500 bg-rose-50/40 dark:bg-rose-950/30"
            : "border-border bg-card" */
        )}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Tag className="h-4 w-4 text-primary" />
            <span>استفاده از کد تخفیف</span>
          </div>

          {status === "valid" && (
            <CheckCircle2 className="h-5 w-5 text-green-500 transition-all" />
          )}
          {status === "invalid" && (
            <XCircle className="h-5 w-5 text-rose-500 transition-all" />
          )}
        </div>

        <div className="relative flex items-center">
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus("idle");
            }}
            placeholder="مثلاً: SAVE10"
            disabled={status === "loading"}
            className={cn(
              "pr-3 h-12 rounded-lg font-semibold text-sm border focus-visible:ring-0",
              status === "valid" &&
                "border-green-500 focus-visible:ring-green-500",
              status === "invalid" &&
                "border-rose-500 focus-visible:ring-rose-500"
            )}
          />

          <Button
            type="button"
            size="sm"
            onClick={handleValidate}
            disabled={status === "loading"}
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
                : "text-muted-foreground"
            )}
          >
            {message}
          </p>
        )}
      </div>
    </FieldContainer>
  );
}
