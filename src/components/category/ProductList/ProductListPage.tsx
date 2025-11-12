"use client";
import React from "react";
import ProductListHeader from "./ProductListHeader";
import ProductListProvider from "../ProductListProvider";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategorySlug } from "@/queries/products";
import CollectionSkelton from "../CollectionSkelton";
import ProductFilterSidebar from "../ProductFilterSidebar";
import ProductList from "./ProductList";

type Props = {
  slug: string;
  query: string;
};

export default function ProductListPage({ slug, query }: Props) {
  const { data } = useQuery(getProductsByCategorySlug(slug, query));
  return data ? (
    <ProductListProvider filters={data.filters}>
      <ProductFilterSidebar />
      <div className="space-y-3 flex-1">
        <ProductListHeader />
        <ProductList products={data.data} />
      </div>
    </ProductListProvider>
  ) : (
    <CollectionSkelton />
  );
}
