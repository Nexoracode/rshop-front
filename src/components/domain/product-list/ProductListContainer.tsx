"use client";

import { getProductsListInfinit } from "@/queries/products/product-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import SidebarFilters from "./Filters/SidebarFilters";
import { cn } from "@/lib/utils/classnames";
import ProductListContent from "./ProductListContent";
import ProductToolbar from "./Toolbar/ProductToolbar";
import Responsive from "@/components/common/Responsive";
import MobileToolbar from "./Toolbar/MobileToolbar";
import ProductListSkelton from "./Skeleton/ProductListSkelton";
import useSticky from "@/hooks/useSticky";

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
  const { isVisible } = useSticky();
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

  if (isLoading || !data) return <ProductListSkelton />;

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  const currentPage = data?.pages?.length ?? 1;
  const totalPages = data?.pages[0]?.meta?.total_pages ?? 1;
  const totalCount = data?.pages[0]?.meta?.total_items ?? 0;
  const filters = data?.pages[0]?.filters;

  return (
    <div className={cn("flex gap-5 mt-4")}>
      {/* فیلترها فقط در دسکتاپ */}
      <Responsive visible="desktop">
        <aside
          className="hidden !min-w-[266px] !max-w-[266px] lg:block"
          style={{
            position: "sticky",
            top: isVisible ? "12rem" : "9.5rem",
            alignSelf: "start",
          }}
        >
          <SidebarFilters filters={filters} />
        </aside>
      </Responsive>

      {/* محتوای اصلی */}
      <div className="relative w-full space-y-1">
        <Responsive visible="mobile">
          <MobileToolbar filters={filters} totalCount={totalCount} />
        </Responsive>
        <Responsive visible="desktop">
          <ProductToolbar total_items={totalCount} />
        </Responsive>
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
