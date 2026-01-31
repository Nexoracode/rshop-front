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
      <Card className="group gap-4 flex flex-row sm:flex-col relative overflow-hidden !p-3 hover:shadow-md transition-all">
        {/* تصویر */}
        <div className="aspect-square rounded-md overflow-hidden bg-muted/5 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-cover size-24 sm:size-fit transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          {/* جزئیات */}
          <div className="space-y-1">
            <p className="text-sm font-medium line-clamp-1">{name}</p>
            <div className="flex items-center justify-between">
              <div className="flex md:flex-col gap-1 items-end">
                <p className="text-sm font-semibold text-muted">
                  {formatToman(final)}
                </p>
                {compareAt && (
                  <p className="text-muted/60 text-xs line-through">
                    {formatToman(compareAt)}
                  </p>
                )}
              </div>
              <div>
                {percent > 0 && <Badge variant={"danger"}>{percent}%</Badge>}
              </div>
            </div>
          </div>

          {/* اکشن‌ها */}
          <Button
            startIcon={<ShoppingCart className="w-4 h-4 ml-1" />}
            size="sm"
            fullWidth
            href={`/p/rsp-${id}`}
            variant={"outline"}
          >
            افزودن به سبد
          </Button>
        </div>
      </Card>
    </Link>
  );
}
