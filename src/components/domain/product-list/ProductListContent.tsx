"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types/product";
import React, { useEffect } from "react";
import ProductList from "./ProductDisplay/ProductList";
import ProductGrid from "./ProductDisplay/ProductGrid";
import LoadMoreTrigger from "./LoadMoreTrigger";
import { useInView } from "react-intersection-observer";
import { MAX_PAGE_INFINIT_LOAD } from "@/data/assets";
import Pagination from "@/components/common/Pagination";

type Props = {
  isLoading: boolean;
  isError: boolean;
  products: Array<Product>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  currentPage: number;
  totalCount: number;
  totalPages: number;
  fetchNextPage: () => void;
};

export default function ProductListContent({
  products,
  hasNextPage,
  currentPage,
  isFetchingNextPage,
  fetchNextPage,
  totalPages,
}: Props) {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const shouldShowPagination =
    hasNextPage && currentPage >= MAX_PAGE_INFINIT_LOAD;
  return (
    <div className="space-y-10">
      {/* نمایش محصولات */}
      {isMobile ? (
        <ProductList products={products} />
      ) : (
        <ProductGrid products={products} />
      )}

      {/* تریگر برای لود بیشتر (infinite scroll) */}
      {hasNextPage && currentPage < 10 && (
        <LoadMoreTrigger
          ref={ref}
          isFetching={isFetchingNextPage}
          message="در حال بارگذاری محصولات بیشتر..."
        />
      )}

      {/* fallback به pagination معمولی بعد از ۱۰ صفحه */}
      {shouldShowPagination && (
        <div className="mt-12 flex justify-center">
          <Pagination page={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
