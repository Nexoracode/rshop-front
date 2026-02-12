"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/classnames";

type Props = {
  icon: React.ElementType;
  label: string;
  value: number | string;
  highlight?: boolean;
  action?: React.ReactNode;
};

export default function OrderStatsCard({
  icon: Icon,
  label,
  value,
  highlight = false,
  action,
}: Props) {
  return (
    <Card
      className={cn(
        "p-4 flex flex-col items-center justify-center gap-2 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
        highlight
          ? "bg-primary/10 border-primary/40"
          : "bg-background hover:bg-muted/30",
      )}
    >
      {/* آیکون */}
      <div
        className={cn(
          "p-2 rounded-full bg-primary/10 text-primary flex items-center justify-center",
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* عنوان و عدد */}
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-2xl font-bold leading-none",
          highlight && "text-primary",
        )}
      >
        {value}
      </p>

      {/* دکمه یا اکشن */}
      {action && <div className="mt-1">{action}</div>}
    </Card>
  );
}
