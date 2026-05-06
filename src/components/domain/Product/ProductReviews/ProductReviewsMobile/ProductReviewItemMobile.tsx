import React from "react";
import ProductRating from "../ProductRating";
import { toPersianDate } from "@/lib/utils/date-time";
import { Review } from "@/types/user";

type Props = {} & Review;

export default function ProductReviewItemMobile({
  user,
  comment,
  created_at,
  rating,
}: Props) {
  return (
    <div className="border h-60 flex gap-2 flex-col justify-between w-[18rem] shrink-0 rounded-lg p-2">
      <div className="">
        <div className="flex items-center">
          <span className="bg-slate-100 flex items-center justify-center rounded-full size-10">
            {user.first_name?.charAt(0) ?? "آ"}
          </span>
          <div className="ps-2">
            <p className="text-sm text-foreground">
              {user.first_name || "کاربر سایت"} {user.last_name}
            </p>
          </div>
        </div>
        <ProductRating className="size-6 mt-2" rating={rating} />
      </div>

      <div className="flex-1">
        <p className="text-muted line-clamp-3  text-xs leading-6">{comment}</p>
      </div>

      <span className="text-xs text-muted/79">{toPersianDate(created_at)}</span>
    </div>
  );
}
