"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote } from "lucide-react";
import useCheckout from "@/hooks/useCheckout";
import { PaymentMethod as Method } from "@/types/order";
import { cn } from "@/lib/utils/classnames";

interface PaymentMethod {
  id: Method;
  label: string;
  description?: string;
  icon: React.ElementType;
}

interface PaymentMethodSelectorProps {
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const methods: PaymentMethod[] = [
  {
    id: "online",
    label: "پرداخت آنلاین (زرین‌پال)",
    description: "پرداخت امن از طریق درگاه زرین‌پال با تمام کارت‌های عضو شتاب",
    icon: CreditCard,
  },
  {
    id: "card_to_card",
    label: "کارت به کارت",
    description: "انتقال وجه به شماره کارت شرکت و ثبت فیش واریزی",
    icon: Banknote,
  },
];

export default function PaymentMethodSelector({
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
    <div className={cn("space-y-3 w-full mt-2", className)}>
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
                "w-full rounded-lg border p-3 sm:p-5 text-right transition-all flex items-center gap-3",
                isSelected
                  ? "border-primary bg-primary/5  ring-primary"
                  : "border-border hover:shadow-md",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border shrink-0",
                  isSelected ? "border-primary bg-primary/10" : "border-slate-500",
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6",
                    isSelected ? "text-primary" : "text-slate-500",
                  )}
                />
              </div>

              <div className="flex flex-col flex-1 text-right">
                <span
                  className={cn(
                    "text-sm font-bold",
                    isSelected ? "text-primary" : "",
                  )}
                >
                  {m.label}
                </span>
                {m.description && (
                  <span className="text-xs text-muted-foreground leading-relaxed mt-2">
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
                    : "border-muted-foreground/30",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
