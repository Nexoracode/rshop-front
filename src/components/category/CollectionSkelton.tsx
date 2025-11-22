import React from "react";
import { Skeleton } from "../ui/skeleton";
import ProductCardSkeleton from "../common/Skeleton/ProductCardSkeleton";
import Responsive from "../common/Responsive";

export default function CollectionSkelton() {
  return (
    <div className="container flex gap-14 justify-between py-10">
      <Responsive visible="desktop">
        <Skeleton className="w-[300px] h-[600px]" />
      </Responsive>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-3">
        <ProductCardSkeleton count={10} />
      </div>
    </div>
  );
}
