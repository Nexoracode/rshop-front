"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote } from "lucide-react";
import { PaymentMethod as Method } from "@/types";
import { useCheckout } from "@/queries/orders";

interface PaymentMethod {
  id: Method;
  label: string;
  description?: string;
  icon: React.ElementType;
}

interface PaymentMethodSelectorProps {
  label?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const methods: PaymentMethod[] = [
  {
    id: "zarinpal",
    label: "پرداخت آنلاین (زرین‌پال)",
    description: "پرداخت امن از طریق درگاه زرین‌پال با تمام کارت‌های عضو شتاب",
    icon: CreditCard,
  },
  {
    id: "cartToCart",
    label: "کارت به کارت",
    description: "انتقال وجه به شماره کارت شرکت و ثبت فیش واریزی",
    icon: Banknote,
  },
];

export default function PaymentMethodSelector({
  label = "روش پرداخت",
  className,
}: PaymentMethodSelectorProps) {
  const {
    handleSetOrderMeta,
    orderMeta: { payment_method },
  } = useCheckout();

  const handleSelect = (payment_method: Method) => {
    handleSetOrderMeta({ payment_method });
  };

  return (
    <div className={cn("space-y-3 w-full", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <div className="grid gap-3">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = m.id === payment_method;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleSelect(m.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-right transition-all flex items-center gap-3 hover:shadow-sm",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:bg-muted/20"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border shrink-0",
                  isSelected ? "border-primary bg-primary/10" : "border-muted"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>

              <div className="flex flex-col flex-1 text-right">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isSelected ? "text-primary" : ""
                  )}
                >
                  {m.label}
                </span>
                {m.description && (
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {m.description}
                  </span>
                )}
              </div>

              {/* رادیوی انتخاب */}
              <div
                className={cn(
                  "ml-auto h-4 w-4 rounded-full border-2",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
