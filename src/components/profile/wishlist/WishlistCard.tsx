"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Badge } from "@/components/ui/badge";
import { WishlistItem } from "@/types/product";
import { formatToman } from "@/lib/utils/price";
import { calcPrice } from "@/lib/utils/number";

type Props = {
  onDelete: (id: number) => void;
  loading: boolean;
} & WishlistItem;

export default function WishlistCard({
  id: item_id,
  product,
  onDelete,
  loading,
}: Props) {
  const { id, price, discount_amount, discount_percent, name } = product;

  const { final, compareAt, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );
  return (
    <Card className="group flex-row sm:flex-col relative overflow-hidden !p-2 hover:shadow-md transition-all">
      {/* تصویر */}
      <div className="aspect-square rounded-md overflow-hidden bg-muted/5 flex items-center justify-center">
        <Image
          src={product.image || PRODUCT_PLACEHOLDER}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover size-28 sm:size-fit transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold line-clamp-1">{name}</p>
          <div className="flex md:flex-col">
            <p className="text-sm font-medium text-foreground">
              {formatToman(final)}
            </p>
            {compareAt ? (
              <div className="flex justify-between">
                <p className="text-xs line-through text-muted">
                  {formatToman(compareAt)}
                </p>
                <Badge className="bg-warning">{percent}%</Badge>
              </div>
            ) : null}
          </div>
        </div>

        {/* اکشن‌ها */}
        <div className="flex justify-between mt-1 gap-2">
          <Button
            variant="outline"
            color="danger"
            isLoading={loading}
            size="sm"
            onClick={() => onDelete(item_id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            startIcon={<ShoppingCart className="mr-2 sm:mr-0" />}
            className="flex-1"
            href={`/p/rsp-${id}`}
            target="_blank"
          >
            <span className="hidden sm:inline-block">افزودن به سبد</span>
          </Button>
        </div>
      </div>

      {/* جزئیات */}
    </Card>
  );
}
