"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { getProductsListInfinit } from "@/queries/products/product-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import SidebarFilters from "./Filters/SidebarFilters";
import MobileFilterSheet from "./MobileFilters/MobileFilterSheet";
import { cn } from "@/lib/utils/classnames";
import ProductListContent from "./ProductListContent";
import ProductToolbar from "./Toolbar/ProductToolbar";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import { SortItem } from "@/types/product";

type Props = {
  type: "all" | "category" | "brand";
  slug?: string;
  query?: string;
  page?: string;
  sortBy?: string;
};

export default function ProductListContainer({
  type,
  slug,
  query,
  page,
  sortBy,
}: Props) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    getProductsListInfinit({ type, slug, query, page, sortBy }),
  );

  const isMobile = useIsMobile();

  if (isLoading || !data) return <CollectionSkelton />;

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  const currentPage = data?.pages.length ?? 1;
  const totalPages = data?.pages[0]?.meta.total_pages ?? 1;
  const totalCount = data?.pages[0]?.meta.total_items ?? 0;
  const filters = data?.pages[0].filters;

  return (
    <div
      className={cn("flex gap-6 md:gap-8", isMobile ? "flex-col" : "flex-row")}
    >
      {/* فیلترها فقط در دسکتاپ */}
      {isMobile ? (
        <MobileFilterSheet totalCount={totalCount} filters={filters} />
      ) : (
        <aside
          className="hidden w-[18rem] lg:block"
          style={{ position: "sticky", top: "6rem", alignSelf: "start" }}
        >
          <SidebarFilters filters={filters} />
        </aside>
      )}

      {/* محتوای اصلی */}
      <div className={cn(isMobile ? "w-full" : " space-y-6 flex-1")}>
        <ProductToolbar total_items={totalCount} />
        <ProductListContent
          products={products}
          fetchNextPage={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
