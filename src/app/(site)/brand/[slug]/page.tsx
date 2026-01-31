import BrandProductListPage from "@/components/brand/BrandProductListPage";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getQueryClient } from "@/lib/get-query-client";
import { getProductsByBrandSlugInfinit } from "@/queries/products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

export default async function BrandPage({
  params,
  searchParams,
}: PageProps<"/brand/[slug]">) {
  const { slug } = await params;
  const { query, sortBy, page } = await searchParams;

  const queryClient = getQueryClient();

  const data = await queryClient.fetchInfiniteQuery(
    getProductsByBrandSlugInfinit(
      slug,
      query as string,
      sortBy as string,
      page as string
    )
  );

  const brand = data.pages[0].brand;

  const breadcrumbItems = [{ label: data.pages[0].brand.name }];

  return (
    <div className="container space-y-1  py-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">
          {brand.name}
        </h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CollectionSkelton />}>
          <BrandProductListPage
            slug={slug}
            query={query as string}
            page={page as string}
            sortBy={sortBy as string}
          />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
