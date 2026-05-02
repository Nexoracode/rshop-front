import React from "react";

import { forwardRef } from "react";
import ProductListItemSkeleton from "./Skeleton/ProductListItemSkeleton";
import ProductListSkelton from "./Skeleton/ProductListSkelton";
import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";

type LoadMoreTriggerProps = {
  isFetching: boolean;
  className?: string;
};

const LoadMoreTrigger = forwardRef<HTMLDivElement, LoadMoreTriggerProps>(
  ({ isFetching, className = "" }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={`
          flex 
          min-h-[80px] 
          items-center 
          justify-center 
          py-6 
          text-muted-foreground 
          transition-opacity 
          duration-300 
          ${className}
        `}
        >
          {!isFetching ? null : (
            // وقتی هنوز لود نشده، یک فضای خالی نگه می‌داره تا observer فعال بمونه
            <div className="h-10 w-full" aria-hidden="true" />
          )}
        </div>
      </>
    );
  },
);

LoadMoreTrigger.displayName = "LoadMoreTrigger";

export default LoadMoreTrigger;
