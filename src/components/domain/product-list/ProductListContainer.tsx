import { useIsMobile } from "@/hooks/use-mobile";
import { getProductsListInfinit } from "@/queries/products/product-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import SidebarFilters from "./Filters/SidebarFilters";
import MobileFilterSheet from "./MobileFilters/MobileFilterSheet";
import { cn } from "@/lib/utils/classnames";
import ProductListContent from "./ProductListContent";

type Props = {
  type: "all" | "category" | "brand";
  slug?: string;
};

export default function ProductListContainer({ type, slug }: Props) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(getProductsListInfinit({ type, slug }));
  const isMobile = useIsMobile();

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const currentPage = data?.pages.length ?? 1;
  const total;
  return (
    <div
      className={cn(
        "grid gap-6 md:gap-8",
        isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12",
      )}
    >
      {/* فیلترها فقط در دسکتاپ */}
      {isMobile ? (
        <MobileFilterSheet />
      ) : (
        <aside
          className="hidden lg:col-span-3 xl:col-span-3 lg:block"
          style={{ position: "sticky", top: "6rem", alignSelf: "start" }}
        >
          <SidebarFilters />
        </aside>
      )}

      {/* محتوای اصلی */}
      <div className={cn(isMobile ? "w-full" : "lg:col-span-9 xl:col-span-9")}>
        <ProductListContent
          products={products}
          fetchNextPage={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          currentPage={}
          hasNextPage={hasNextPage}
          totalCount={}
        />
      </div>
    </div>
  );
}
