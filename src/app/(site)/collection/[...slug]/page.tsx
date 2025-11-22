import { getQueryClient } from "@/lib/get-query-client";
import React, { Suspense } from "react";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getProductsInfinit } from "@/queries/products";
import ProductListPage from "@/components/category/ProductList/ProductListPage";

export default async function CategoryPage(
  props: PageProps<"/collection/[...slug]">
) {
  const { slug } = await props.params;
  const { query, sortBy, page } = await props.searchParams;
  const categorySlug = slug.pop() ?? "";

  if (!categorySlug) return notFound();

  const queryStr = `${query}`;

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(
    getProductsInfinit(categorySlug, queryStr, sortBy as string, page as string)
  );

  return (
    <div className="container flex flex-col md:flex-row gap-14 justify-between py-10">
      <Suspense fallback={<CollectionSkelton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductListPage
            slug={categorySlug}
            query={queryStr}
            page={page as string}
            sortBy={sortBy as string}
          />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
