import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {
  count?: number;
};

export default function ProductCardSkeleton({ count = 1 }: Props) {
  return [...Array(count).keys()].map((i) => (
    <div key={i} className="border rounded-lg h-fit space-y-4 p-2">
      <Skeleton className="w-full aspect-square rounded-md" />

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />

      <div className="flex justify-end">
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </div>
  ));
}
