import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {
  count?: number;
  className?: string;
};

export default function ProductListItemSkeleton({
  count = 1,
  className,
}: Props) {
  return [...Array(count).keys()].map((i) => (
    <div
      key={i}
      className={`flex border rounded-md w-full p-2 ${className || ""}`}
    >
      <Skeleton className="w-24 h-24" />

      <div className="flex-1 flex flex-col justify-between ps-6">
        <Skeleton className="h-3 w-26" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
  ));
}
