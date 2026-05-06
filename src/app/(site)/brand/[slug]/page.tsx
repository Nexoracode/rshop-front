import Breadcrumb from "@/components/common/Breadcrumb";
import ProductListContainer from "@/components/domain/product-list/ProductListContainer";
import { getQueryClient } from "@/lib/utils/query-client";
import { queryParamToString } from "@/lib/utils/serialize-general";
import { getBrandBySlug } from "@/queries/products/brand";
import { fetchBrandsSlugs } from "@/queries/products/category";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 600; // کوتاه‌تر برای محصولات (قیمت/موجودی حساس)

export async function generateStaticParams() {
  const slugs = await fetchBrandsSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}
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
        <h1 className="text-foreground font-medium text-base">{brand.name}</h1>
      </div>
      <ProductListContainer
        query={queryParamToString(query)}
        page={queryParamToString(page)}
        sortBy={queryParamToString(sortBy)}
        slug={slug}
        type="brand"
      />
    </div>
  );
}
