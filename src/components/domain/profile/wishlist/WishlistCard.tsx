"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyeIcon, Trash2 } from "lucide-react";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
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
  const { id, image, name } = product;

  return (
    <Card className="group flex-row sm:flex-col relative overflow-hidden !p-2 hover:shadow-md transition-all">
      {/* تصویر */}
      <div className="aspect-square rounded-md overflow-hidden bg-muted/5 flex items-center justify-center">
        <Image
          src={image || PRODUCT_PLACEHOLDER}
          alt={name}
          width={300}
          height={300}
          className="object-cover size-28 sm:size-fit transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold line-clamp-1">{name}</p>
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
            startIcon={<EyeIcon className="mr-2 sm:mr-0" />}
            className="flex-1"
            href={`/p/rsp-${id}`}
            target="_blank"
          >
            <span className="hidden sm:inline-block">مشاهده محصول</span>
          </Button>
        </div>
      </div>

      {/* جزئیات */}
    </Card>
  );
}
