import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toPersianDate } from "@/lib/utils/date-time";
import { PaginateData } from "@/types";
import { Review } from "@/types/user";
import { StarIcon } from "lucide-react";
import React from "react";
import ProductRating from "./ProductRating";

type Props = {
  averege_rating: number;
  count: number;
} & PaginateData<Review>;

export default function ProductReviewsMobile({
  data,
  averege_rating,
  count,
}: Props) {
  return (
    <section>
      <div>
        <h4>دیدگاه کاربران</h4>

        <Button>{`مشاهده ${count} دیدگاه`}</Button>
      </div>
      <div>
        <span>{averege_rating}</span>
        <StarIcon />
      </div>
      <div>
        <div>
          {data.map((i) => (
            <div key={i.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-slate-100 flex items-center justify-center rounded-full size-10">
                    {i.user.first_name?.charAt(0) ?? "آ"}
                  </span>
                  <div className="ps-2">
                    <p className="text-sm text-foreground">
                      {i.user.first_name || "کاربر سایت"} {i.user.last_name}
                    </p>
                    <span className="text-xs text-muted/79">
                      {toPersianDate(i.created_at)}
                    </span>
                  </div>
                </div>
                <ProductRating className="size-4" rating={i.rating} />
              </div>

              <p className="text-muted  text-sm leading-6 p-3">{i.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
