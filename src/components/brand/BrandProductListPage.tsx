"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductListLayout from "../category/ProductList/ProductListLayout";
import CollectionSkelton from "../category/CollectionSkelton";
import { getProductsListInfinit } from "@/queries/products/product-list";
import { SortItem } from "@/types/product";

type Props = {
  slug: string;
  query: string;
  page: string;
  sortBy: SortItem;
};

export default function BrandProductListPage({
  slug,
  query = "",
  page,
  sortBy,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      getProductsListInfinit({ type: "brand", page, query, sortBy }),
    );

  return data ? (
    <ProductListLayout
      filters={data.pages[0].filters}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      page={page}
      pages={data.pages}
    />
  ) : (
    <CollectionSkelton />
  );
}
