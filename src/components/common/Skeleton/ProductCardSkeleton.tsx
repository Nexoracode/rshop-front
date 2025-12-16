import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  count?: number;
  className?: string;
};

export default function ProductCardSkeleton({ count = 1, className }: Props) {
  return [...Array(count).keys()].map((i) => (
    <div
      key={i}
      className={cn("border rounded-lg h-fit space-y-4 p-2", className)}
    >
      <Skeleton className="w-full aspect-square rounded-md" />

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />

      <div className="flex justify-end">
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </div>
  ));
}
