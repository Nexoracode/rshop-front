import { StarHalf } from "@/components/common/Icons/StarHalf";
import { Star } from "lucide-react";
import React from "react";

type Props = {
  rating: number;
};

export default function ProductRating({ rating }: Props) {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.floor(rating) ? (
          <Star key={i} fill="currentColor" strokeWidth={1} />
        ) : i === Math.ceil(rating) ? (
          <StarHalf strokeWidth={1} key={i} className="rotate-y-180" />
        ) : (
          <Star key={i} strokeWidth={1} />
        )
      )}
    </div>
  );
}
