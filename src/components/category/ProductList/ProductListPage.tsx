"use client";
import React from "react";
import ProductListHeader from "./ProductListHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsInfinit } from "@/queries/products";
import CollectionSkelton from "../CollectionSkelton";
import ProductFilterSidebar from "../ProductFilterSidebar";
import ProductList from "./ProductList";
import Pagination from "@/components/common/Pagination";
import { MAX_PAGE_INFINIT_LOAD } from "@/data/assets";

type Props = {
  slug: string;
  query: string;
  page: string;
  sortBy: string;
};

export default function ProductListPage({
  slug,
  query = "",
  page,
  sortBy,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(getProductsInfinit(slug, query ?? "", sortBy, page));
  const lastPage = data?.pages.at(-1);

  const handleScroll = () => {
    if (!page && Number(lastPage?.meta.current_page) < MAX_PAGE_INFINIT_LOAD)
      fetchNextPage();
  };
  return data ? (
    <div className="flex flex-col md:flex-row gap-14 justify-between pt-3">
      <ProductFilterSidebar filters={data.pages[0].filters} />
      <div className="space-y-3 flex-1">
        <ProductListHeader
          filters={data.pages[0].filters}
          total_items={data.pages[0].meta.total_items}
        />

        <ProductList
          pages={data.pages}
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
  ) : (
    <CollectionSkelton />
  );
}
