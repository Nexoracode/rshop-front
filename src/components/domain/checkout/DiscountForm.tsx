"use client";

import * as React from "react";

import { Loader2 } from "lucide-react";
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
      if(res){
        setStatus("valid");
        setMessage(
          `مبلغ ${formatToman(res.discount)} تخفیف به این سفارش تعلق گرفت .`,
        );
        toast.success("کد تخفیف با موفقیت اعمال شد.");
        handleSetOrderMeta({
          promotion_code: code,
          discount_amount: res.discount,
        });
      }else {
        setStatus("invalid")
      }
   
  };

  return (
    <FieldContainer error="" label="">
      <div className={cn("relative w-full transition-all")}>
        <div className={cn("relative  flex items-center border rounded-lg p-3" ,  status === "valid" &&
                "border-green-500 focus-visible:ring-green-500",
              status === "invalid" &&
                "border-rose-500 focus-visible:ring-rose-500",)}>
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
            className="rounded-md px-4 h-9"
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
