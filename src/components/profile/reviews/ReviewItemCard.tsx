"use client";

import Image from "next/image";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { toPersainDate } from "@/lib/utils";
import { Menu } from "@/components/common/Menu";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types/user";
import ProductRating from "@/components/Product/ProductReviews/ProductRating";
import Link from "next/link";

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
  is_approved,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="space-y-2 border-b p-3 last:border-b-0">
      <div className="flex items-stretch">
        <Link href={`/p/rsp-${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={64}
            height={64}
            className="rounded-md border object-cover"
          />
        </Link>
        <div className="flex-1 pr-3">
          <p className="font-medium text-sm">{product.name}</p>
          <div className="text-sm text-muted">{toPersainDate(created_at)}</div>
        </div>
        <div>
          {is_approved === true && (
            <Badge variant={"success"}>
              <Check /> تایید شده
            </Badge>
          )}
          {is_approved === null && (
            <Badge variant={"neutral"}>
              <Check /> در حال بررسی
            </Badge>
          )}
          {is_approved === false && (
            <Badge variant={"danger"}>
              <X /> رد شده
            </Badge>
          )}
        </div>
      </div>
      <ProductRating rating={rating} />

      <p className="text-sm leading-relaxed border-t pt-2">{comment}</p>

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
    </div>
  );
}
