"use client";

import * as React from "react";

import {
  BadgeCheckIcon,
  BadgePercentIcon,
  Loader2,
  TicketIcon,
} from "lucide-react";
import useCheckPromotion from "@/hooks/useCheckPromotion";
import useCheckout from "@/hooks/useCheckout";
import { cn } from "@/lib/utils/classnames";
import FieldContainer from "@/components/common/Form/FieldContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatToman } from "@/lib/utils/price";
import { toast } from "sonner";

export default function DiscountForm() {
  const { handleCheck } = useCheckPromotion();
  const [code, setCode] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [message, setMessage] = React.useState("");
  const { handleSetOrderMeta, orderMeta } = useCheckout();

  const handleValidate = async () => {
    if (!code.trim()) {
      setMessage("لطفاً کد تخفیف را وارد کنید.");
      setStatus("invalid");
      return;
    }

    setMessage("");

    const res = await handleCheck(code);
    if (res) {
      setStatus("valid");
      setMessage(
        ` ${res.applied_promotions[0].name} به مبلغ ${formatToman(res.discount)} به این سفارش تعلق گرفت.`,
      );
      toast.success("کد تخفیف با موفقیت اعمال شد.");
      handleSetOrderMeta({
        promotion_code: code,
        discount_amount: res.discount,
        promotions: res.applied_promotions,
      });
    } else {
      setStatus("invalid");
    }
  };

  return (
    <FieldContainer error="" label="">
      <div className={cn("relative w-full lg:w-[350px] transition-all")}>
        {orderMeta.promotion_code ? (
          <div
            className={cn(
              "relative  flex items-center border rounded-lg p-2",
              status === "valid" &&
                "border-green-500 focus-visible:ring-green-500",
            )}
          >
            <BadgeCheckIcon className="text-green-600" size={42} />
            {message && (
              <p
                className={cn(
                  "text-sm pr-1 leading-7 font-medium",
                  status === "valid"
                    ? "text-green-600 dark:text-green-400"
                    : status === "invalid"
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-muted-foreground",
                )}
              >
                {message}
              </p>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "relative  flex items-center border rounded-lg py-4 px-6",
              status === "valid" &&
                "border-green-500 focus-visible:ring-green-500",
              status === "invalid" &&
                "border-rose-500 focus-visible:ring-rose-500",
            )}
          >
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setStatus("idle");
              }}
              placeholder="کد تخفیف دارید؟ وارد کنید..."
              disabled={status === "loading" || !!orderMeta.promotion_code}
              className={
                "font-medium text-sm border-none shadow-none focus-visible:ring-0 !p-0"
              }
            />

            <Button
              type="button"
              size="sm"
              onClick={handleValidate}
              disabled={status === "loading" || status === "valid"}
              className="rounded-md px-4 h-9 bg-black/80"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "اعمال کد"
              )}
            </Button>
          </div>
        )}
      </div>
    </FieldContainer>
  );
}
