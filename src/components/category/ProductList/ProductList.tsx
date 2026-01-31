"use client";
import React, { useEffect } from "react";
import ProductRow from "@/components/Product/ProductCard/ProductRow";
import { PaginateData } from "@/types";
import { Product } from "@/types/product";
import ProductCard from "@/components/Product/ProductCard";
import ProductCardSkeleton from "@/components/common/Skeleton/ProductCardSkeleton";
import { useInView } from "react-intersection-observer";
import { useViewMode } from "@/hooks/useViewMode";
import EmptyState from "@/components/common/EmptyState";

type Props = {
  pages: Array<PaginateData<Product>>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onScroll: () => void;
};

export default function ProductList({
  pages,
  isFetchingNextPage,
  hasNextPage,
  onScroll,
}: Props) {
  const { viewMode } = useViewMode();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) onScroll();
  }, [inView, hasNextPage, isFetchingNextPage, onScroll]);

  return viewMode === "list" ? (
    <div className="flex-1 gap-3 grid grid-cols-1">
      {pages.map((page) =>
        page.data.map((product) => <ProductRow {...product} key={product.id} />)
      )}
    </div>
  ) : (
    <div className="flex-1 grid grid-cols-1 min-[340px]:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
      {pages[0].meta.total_items > 0 ? (
        <>
          {pages.map((page) =>
            page.data.map((product) => (
              <div
                key={product.id}
                className="border-b hover:z-20 hover:shadow-around border-l 2xl:nth-[5n]:border-l-0 xl:nth-[4n]:border-l-0 lg:nth-[3n]:border-l-0 sm:nth-[2n]:border-l-0 2xl:nth-[4n]:border-l xl:nth-[3n]:border-l lg:nth-[2n]:border-l"
              >
                <ProductCard {...product} />
              </div>
            ))
          )}
          {isFetchingNextPage && <ProductCardSkeleton count={10} />}
          {!isFetchingNextPage && hasNextPage && (
            <div ref={ref} className="w-full h-12 col-span-full"></div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
