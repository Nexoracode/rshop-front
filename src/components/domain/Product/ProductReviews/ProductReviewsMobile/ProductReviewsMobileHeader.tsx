import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/utils/price";
import { ChevronLeft, StarIcon } from "lucide-react";
import React from "react";

type Props = {
  count: number;
  averege_rating: number;
  onShowAll: () => void;
};

export default function ProductReviewsMobileHeader({
  count,
  averege_rating,
  onShowAll,
}: Props) {
  return (
    <>
      <div className="flex h-10 justify-between items-start">
        <h4>دیدگاه کاربران</h4>

        {count > 0 ? (
          <Button
            variant={"text"}
            endIcon={<ChevronLeft size={15} />}
            className="text-slate-700 gap-1 px-0"
            size={"sm"}
            color="neutral"
            onClick={onShowAll}
          >
            <span className="text-">{`مشاهده ${count} دیدگاه`}</span>
          </Button>
        ) : null}
      </div>
      {count > 0 ? (
        <div className="flex h-10 items-center gap-1">
          <span className="text-2xl leading-0 font-extrabold">
            {toFaDigits(averege_rating)}
          </span>
          <StarIcon
            className="text-yellow-500"
            fill="currentColor"
            strokeWidth={1}
          />
          <span className="text-slate-400 text-xs font-light">
            (بر اساس نظرات کاربران)
          </span>
        </div>
      ) : null}
    </>
  );
}
