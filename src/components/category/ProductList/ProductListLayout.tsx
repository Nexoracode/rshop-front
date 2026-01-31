import React from "react";
import ProductFilterSidebar from "../ProductFilterSidebar";
import ProductListHeader from "./ProductListHeader";
import ProductList from "./ProductList";
import Pagination from "@/components/common/Pagination";
import { MAX_PAGE_INFINIT_LOAD } from "@/data/assets";
import { PaginateData, ProductFilters } from "@/types";
import { Product } from "@/types/product";

type Props = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  pages: Array<PaginateData<Product>>;
  filters: ProductFilters;
  page: string;
};

export default function ProductListLayout({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  pages,
  filters,
  page,
}: Props) {
  const lastPage = pages.at(-1);
  const handleScroll = () => {
    if (!page && Number(lastPage?.meta.current_page) < MAX_PAGE_INFINIT_LOAD)
      fetchNextPage();
  };
  return (
    <div className="flex flex-col mb-6 md:flex-row gap-14 justify-between pt-3">
      <ProductFilterSidebar filters={filters} />
      <div className="space-y-3 flex-1">
        <ProductListHeader
          filters={filters}
          total_items={pages[0].meta.total_items}
        />

        <ProductList
          pages={pages}
          onScroll={handleScroll}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />

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
