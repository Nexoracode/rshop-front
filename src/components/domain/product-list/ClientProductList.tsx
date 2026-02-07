"use client";
import React from "react";
import SidebarFilters from "./Filters/SidebarFilters";
import ProductToolbar from "./Toolbar/ProductToolbar";
import ActiveFilters from "./Filters/ActiveFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileFilterSheet from "./MobileFilters/MobileFilterSheet";
import PaginationFallback from "./PaginationFallback";

type Props = {
  categorySlug?: string;
  brandSlug?: string;
};

export default function ClientProductList({ categorySlug, brandSlug }: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col mb-6 md:flex-row gap-14 justify-between pt-3">
      <SidebarFilters filters={filters} />
      <div className="space-y-3 flex-1">
        <ActiveFilters />
        <ProductToolbar
          filters={filters}
          total_items={pages[0].meta.total_items}
        />

        {isMobile ? <ProductList /> : <ProductGrid />}
        <ProductList
          pages={pages}
          onScroll={handleScroll}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />

        {isMobile && <MobileFilterSheet />}

        <PaginationFallback />

        {page ||
        (Number(lastPage?.meta.current_page) >= MAX_PAGE_INFINIT_LOAD &&
          Number(lastPage?.meta.total_pages) > 0) ? (
          <Pagination
            page={+page || Number(lastPage?.meta.current_page)}
            totalPages={lastPage?.meta.total_pages ?? 0}
          />
        ) : null}
      </div>
    </div>
  );
}
