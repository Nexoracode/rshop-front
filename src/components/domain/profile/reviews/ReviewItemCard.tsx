"use client";

import Image from "next/image";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Menu } from "@/components/common/Menu";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types/user";
import ProductRating from "@/components/domain/Product/ProductReviews/ProductRating";
import Link from "next/link";
import { toPersianDate } from "@/lib/utils/date-time";

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
    <div className="space-y-2 relative border p-4 rounded-lg">
      <div className="flex">
        <Link href={`/p/rsp-${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-lg border object-cover"
          />
        </Link>
        <div className="flex flex-col gap-4 pr-3">
          <div>
            <p className="font-medium text-sm">{product.name}</p>
            <div className="text-sm text-muted mt-1">
              {toPersianDate(created_at)}
            </div>
          </div>
          <ProductRating rating={rating} className="size-4" />
        </div>
      </div>

      <p className="text-sm leading-relaxed pt-2">{comment}</p>

      <div className="absolute flex items-center left-2 top-3">
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

        <Menu
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
    </div>
  );
}
