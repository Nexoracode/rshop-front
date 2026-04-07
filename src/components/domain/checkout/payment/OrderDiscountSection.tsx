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
    <Card className="p-4 space-y-3" dir="rtl">
      <h3 className="font-medium text-lg">تخفیف‌های استفاده‌شده</h3>

      <div className="space-y-2">
        {promotions.map((d) => (
          <div
            key={d.promotion_id}
            className="border rounded-md p-3 flex justify-between items-center text-sm"
          >
            <div>
              <div className="font-medium">{d.id}</div>
              <div className="text-gray-600 text-xs mt-1">{d.name}</div>
            </div>

            <div className="font-medium text-green-600">
              -{formatToman(+d.amount)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
