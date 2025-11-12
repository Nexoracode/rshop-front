"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { calcPrice, formatToman } from "@/lib/utils";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Badge } from "@/components/ui/badge";
import { WishlistItem } from "@/types/product";

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
    discount_percent
  );
  return (
    <Card className="group relative overflow-hidden !p-2 hover:shadow-md transition-all">
      {/* تصویر */}
      <div className="aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center">
        <Image
          src={product.image || PRODUCT_PLACEHOLDER}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* جزئیات */}
      <div className="space-y-1">
        <p className="text-sm font-semibold line-clamp-1">{name}</p>
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
        >
          <span className="hidden sm:inline-block">افزودن به سبد</span>
        </Button>
      </div>
    </Card>
  );
}
