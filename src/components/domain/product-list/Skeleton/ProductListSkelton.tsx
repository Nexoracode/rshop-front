"use client";
import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import { Skeleton, Skeletons } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export default function ProductListSkelton() {
  const isMobile = useIsMobile();
  return (
    <div className="container flex gap-14 justify-between">
      {isMobile ? (
        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <Skeletons count={4} className="h-8 flex-1" />
          </div>
          <Skeletons count={6} className="h-24" />
        </div>
      ) : (
        <div className="container flex gap-5 justify-between">
          <Skeleton className="!min-w-[266px] h-full" />

          <div className="w-full flex flex-col gap-2">
            <Skeleton className="!w-[99%] h-[41px] mx-auto" />
            <div className="grid grid-cols-2 lg:grid-cols-5">
              <ProductCardSkeleton count={10} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
