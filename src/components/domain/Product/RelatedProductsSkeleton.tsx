import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import React from "react";

export default function RelatedProductsSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex  gap-4 flex-nowrap">
        <ProductCardSkeleton
          className="basis-[14rem] sm:basis-[15rem] min-w-0 shrink-0 grow-0"
          count={8}
        />
      </div>
    </div>
  );
}
