"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsInfinit } from "@/queries/products";
import CollectionSkelton from "../CollectionSkelton";
import ProductListLayout from "./ProductListLayout";

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
    useInfiniteQuery(getProductsInfinit(slug, query, sortBy, page));

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
