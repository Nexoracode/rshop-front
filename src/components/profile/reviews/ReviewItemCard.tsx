"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { toPersainDate } from "@/lib/utils";
import { Menu } from "@/components/common/Menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types/user";
import ProductRating from "@/components/Product/ProductRating";

type Props = {
  onEdit: (reviewId: number) => void;
  onDelete: (reviewId: number) => void;
} & Review;

export default function ReviewItemCard({
  product,
  rating,
  created_at,
  comment,
  id,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="!p-4">
      <div className="flex items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={64}
          height={64}
          className="rounded-md border object-cover"
        />
        <div className="flex-1 pr-3">
          <p className="font-medium">{product.name}</p>
        </div>
        <div>
          <div className="text-xs text-muted">{toPersainDate(created_at)}</div>
          <Badge variant={"success"}>
            <Check /> تایید شده
          </Badge>
          <Badge variant={"neutral"}>
            <Check /> در حال بررسی
          </Badge>
          <Badge variant={"danger"}>
            <X /> رد شده
          </Badge>
        </div>
      </div>
      <ProductRating rating={rating} />

      <Separator className="my-4" />

      <p className="text-sm leading-relaxed">{comment}</p>

      <Menu
        className="absolute top-2 left-2"
        items={[
          { Icon: Pencil, label: "ویرایش دیدگاه", onClick: () => onEdit(id) },
          {
            Icon: Trash2,
            label: "حذف دیدگاه",
            color: "danger",
            onClick: () => onDelete(id),
          },
        ]}
      />
    </Card>
  );
}
