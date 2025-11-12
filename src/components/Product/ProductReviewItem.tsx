import React from "react";
import ProductRating from "../modules/product/ProductRating";
import { toPersainDate } from "@/lib/utils";
import { Review } from "@/types/user";

type Props = {
  review: Review;
};

export default function ProductReviewItem({ review }: Props) {
  const { comment, rating, user, created_at } = review;
  return (
    <div className="space-y-2 w-full max-w-4xl border p-4 rounded-sm shadow-xs">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="bg-amber-800/30 flex items-center justify-center rounded-full size-10">
            {user.first_name?.charAt(0) ?? "آ"}
          </span>

          <p className="ps-2 font-semibold text-foreground">
            {user.first_name || "کاربر سایت"} {user.last_name}
          </p>
        </div>
        <span>{toPersainDate(created_at)}</span>
      </div>

      <ProductRating rating={rating} />

      <p className="text-muted-foreground text-sm leading-6">{comment}</p>
    </div>
  );
}
