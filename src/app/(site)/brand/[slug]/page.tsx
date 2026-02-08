import BrandProductListPage from "@/components/brand/BrandProductListPage";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getQueryClient } from "@/lib/utils/query-client";
import { getBrandBySlug } from "@/queries/products/brand";
import { SortItem } from "@/types/product";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function BrandPage({
  params,
  searchParams,
}: PageProps<"/brand/[slug]">) {
  const { slug } = await params;
  const { query, sortBy, page } = await searchParams;

  const queryClient = getQueryClient();

  const brand = await queryClient.fetchQuery(getBrandBySlug(slug));

  if (!brand) return notFound();

  const breadcrumbItems = [{ label: brand.name }];

  return (
    <div className="container space-y-1  py-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">
          {brand.name}
        </h1>
      </div>
      <Suspense fallback={<CollectionSkelton />}>
        <BrandProductListPage
          slug={slug}
          query={query as string}
          page={page as string}
          sortBy={sortBy as SortItem}
        />
      </Suspense>
    </div>
  );
}
