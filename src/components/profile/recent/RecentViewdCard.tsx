"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { RecentView } from "@/types/user";
import Link from "next/link";
import { calcPrice, formatToman } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function RecentViewedCard({
  product: { discount_amount, discount_percent, id, image, price, name },
}: RecentView) {
  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent
  );
  return (
    <Link href={`/p/rsp-${id}`} className="">
      <Card className="group gap-4 relative overflow-hidden !p-3 hover:shadow-md transition-all">
        {/* تصویر */}
        <div className="aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* جزئیات */}
        <div className="space-y-4">
          <p className="text-sm font-medium line-clamp-1">{name}</p>
          <div className="flex items-center justify-between">
            <div>
              {percent > 0 && <Badge variant={"danger"}>{percent}%</Badge>}
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-muted">
                {formatToman(final)}
              </p>
              {compareAt && (
                <p className="text-muted/60 text-xs line-through">
                  {formatToman(compareAt)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* اکشن‌ها */}
        <Button startIcon={<ShoppingCart className="w-4 h-4 ml-1" />} size="md">
          افزودن به سبد
        </Button>
      </Card>
    </Link>
  );
}
