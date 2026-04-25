"use client";

import { Card } from "@/components/ui/card";
import { formatToman } from "@/lib/utils/price";
import { Promotion } from "@/types/order";

export function OrderDiscountSection({
  promotions,
}: {
  promotions: Array<Promotion>;
}) {
  return (
    <Card
      className="p-4 sm:p-6 space-y-4 border border-slate-200 rounded-lg"
      dir="rtl"
    >
      {/* title */}
      <h3 className="font-bold text-base sm:text-lg text-foreground">
        تخفیف‌های استفاده‌شده
      </h3>

      <div className="space-y-3">
        {promotions.map((d) => (
          <div
            key={d.promotion_id}
            className="flex items-center justify-between border border-slate-100 rounded-lg px-3 py-3 sm:py-4 bg-white"
          >
            {/* left */}
            <div className="flex flex-col gap-1">
              <div className="font-medium text-sm text-foreground">
                {d.name}
              </div>

              <div className="text-xs text-muted-foreground">
                کد: {d.id}
              </div>
            </div>

            {/* right */}
            <div className="font-medium text-sm sm:text-base text-green-600 whitespace-nowrap">
              -{formatToman(+d.amount, false)}{" "}
              <span className="text-xs text-green-600">تومان</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}