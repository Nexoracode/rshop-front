"use client";
import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import { Skeleton, Skeletons } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export default function ProductListSkelton() {
  const isMobile = useIsMobile();
  return (
    <div className="container flex gap-14 justify-between py-10">
      {isMobile ? (
        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <Skeletons count={4} className="h-8 flex-1" />
          </div>
          <Skeletons count={6} className="h-24" />
        </div>
      ) : (
        <div className="container flex gap-14 justify-between py-10">
          <Skeleton className="w-[300px] h-[600px]" />

          <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-3">
            <ProductCardSkeleton count={10} />
          </div>
        </div>
      )}
    </div>
  );
}
