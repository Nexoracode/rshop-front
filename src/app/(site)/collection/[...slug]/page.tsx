import { getQueryClient } from "@/lib/get-query-client";
import React, { Suspense } from "react";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductListPage from "@/components/category/ProductList/ProductListPage";
import { getProductsByCategorySlug } from "@/queries/products";
import { notFound } from "next/navigation";

export default async function CategoryPage(
  props: PageProps<"/collection/[...slug]">
) {
  const { slug } = await props.params;
  const { query } = await props.searchParams;
  const categorySlug = slug.pop() ?? "";

  if (!categorySlug) return notFound();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    getProductsByCategorySlug(categorySlug, query as string)
  );

  return (
    <div className="container flex flex-col md:flex-row gap-14 justify-between py-10">
      <Suspense fallback={<CollectionSkelton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductListPage slug={categorySlug} query={query as string} />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
