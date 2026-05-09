import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function HomePageSkeleton({}: Props) {
  return (
    <div>
      <Skeleton className="w-full h-[20rem]" />
    </div>
  );
}
