import React from "react";
import { Review } from "@/types/user";
import ProductRating from "./ProductRating";
import { toPersianDate } from "@/lib/utils/date-time";

type Props = {
  review: Review;
};

export default function ProductReviewItem({ review }: Props) {
  const { comment, rating, user, created_at } = review;
  return (
    <div className="space-y-3 w-full max-w-4xl border p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-slate-100 flex items-center justify-center rounded-full size-10">
            {user.first_name?.charAt(0) ?? "آ"}
          </span>
          <div className="ps-2">
            <p className="text-sm text-foreground">
              {user.first_name || "کاربر سایت"} {user.last_name}
            </p>
            <span className="text-xs text-muted/79">
              {toPersianDate(created_at)}
            </span>
          </div>
        </div>
        <ProductRating className="size-4" rating={rating} />
      </div>

      <p className="text-muted  text-sm leading-6 p-3">{comment}</p>
    </div>
  );
}
