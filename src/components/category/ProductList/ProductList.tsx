"use client";
import React, { useEffect } from "react";
import ProductRow from "@/components/common/ProductCard/ProductRow";
import { PaginateData } from "@/types";
import { Product } from "@/types/product";
import ProductCard from "@/components/common/ProductCard";
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
    <div className="flex-1 gap-3 grid grid-cols-1 min-[340px]:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      {pages[0].meta.total_items > 0 ? (
        <>
          {pages.map((page) =>
            page.data.map((product) => (
              <ProductCard {...product} key={product.id} />
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
