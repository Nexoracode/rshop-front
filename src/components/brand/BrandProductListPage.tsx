"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsByBrandSlugInfinit } from "@/queries/products";
import ProductListLayout from "../category/ProductList/ProductListLayout";
import CollectionSkelton from "../category/CollectionSkelton";

type Props = {
  slug: string;
  query: string;
  page: string;
  sortBy: string;
};

export default function BrandProductListPage({
  slug,
  query = "",
  page,
  sortBy,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(getProductsByBrandSlugInfinit(slug, query, sortBy, page));

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
