import { getQueryClient } from "@/lib/get-query-client";
import React, { Suspense } from "react";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategorySeoDataBySlug,
  getProductsInfinit,
} from "@/queries/products";
import ProductListPage from "@/components/category/ProductList/ProductListPage";
import { Metadata } from "next";
import { SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryDescription from "@/components/category/CategoryDescription";
import { Separator } from "@/components/ui/separator";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/category/[...slug]">): Promise<Metadata> {
  const queryClient = getQueryClient();
  const { slug } = await params;
  const categorySlug = slug.pop() ?? "";
  const category = await queryClient.fetchQuery(
    getCategorySeoDataBySlug(categorySlug)
  );
  if (!category) {
    return {
      title: "دسته‌بندی یافت نشد",
      robots: { index: false, follow: false },
    };
  }
  const { page = "1" } = await searchParams;

  const currentPage = Number(page as string);

  const baseUrl = `${SHOP_URL}/category/${slug.join("/")}`;
  const currentUrl =
    currentPage > 1 ? `${baseUrl}?page=${currentPage}` : baseUrl;

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: category.title,
      description: category.description,
      url: currentUrl,
      type: "website",
      locale: "fa_IR",
    },
    robots: {
      index: currentPage === 1, // فقط صفحه اول ایندکس بشه
      follow: true,
    },
  };
}
export default async function CategoryPage(
  props: PageProps<"/category/[...slug]">
) {
  const { slug } = await props.params;
  const { query, sortBy, page } = await props.searchParams;
  const categorySlug = slug.pop() ?? "";

  if (!categorySlug) return notFound();
  const queryClient = getQueryClient();

  const category = await queryClient.fetchQuery(
    getCategoryBySlug(categorySlug)
  );

  const categoryParents = category.parents.sort((a, b) => a.level - b.level);

  const breadcrumbItems = [
    ...category.parents.map((c) => ({
      label: c.title,
      href: `/category/${categoryParents
        .filter((p) => p.level > c.level)
        .map((p) => p.slug)
        .join("/")}`,
    })),
  ];

  const queryStr = `${query}`;

  await queryClient.prefetchInfiniteQuery(
    getProductsInfinit(categorySlug, queryStr, sortBy as string, page as string)
  );

  return (
    <div className="container space-y-1  py-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">
          {category.category.title}
        </h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CollectionSkelton />}>
          <ProductListPage
            slug={categorySlug}
            query={queryStr}
            page={page as string}
            sortBy={sortBy as string}
          />
        </Suspense>
      </HydrationBoundary>

      <Separator />
      {category.category.description && (
        <CategoryDescription description={category.category.description} />
      )}
    </div>
  );
}
