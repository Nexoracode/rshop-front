import { getQueryClient } from "@/lib/get-query-client";
import React, { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  getCategoryBySlug,
  getCategorySeoDataBySlug,
  getProductsInfinit,
} from "@/queries/products";
import { Metadata } from "next";
import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import ProductListPage from "@/components/category/ProductList/ProductListPage";
import CategoryDescription from "@/components/category/CategoryDescription";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/products/[[...slug]]">): Promise<Metadata> {
  const queryClient = getQueryClient();
  const { slug } = await params;
  const categorySlug = slug?.pop() ?? "";
  const category = categorySlug
    ? await queryClient.fetchQuery(getCategorySeoDataBySlug(categorySlug))
    : null;

  const { page = "1" } = await searchParams;

  const currentPage = Number(page as string);

  const baseUrl = `${SHOP_URL}/products/${slug?.join("/")}`;
  const currentUrl =
    currentPage > 1 ? `${baseUrl}?page=${currentPage}` : baseUrl;
  const title = `${category?.title ?? "محصولات "}${SHOP_NAME}`;
  const description = `${
    category?.description ?? "محصولات فروشگاه آرشاپ"
  }${SHOP_NAME}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: title,
      description: description,
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
  props: PageProps<"/products/[[...slug]]">
) {
  const { slug } = await props.params;
  const { query, sortBy, page } = await props.searchParams;
  const categorySlug = slug?.pop() ?? "";

  const queryClient = getQueryClient();

  const category = categorySlug
    ? await queryClient.fetchQuery(getCategoryBySlug(categorySlug))
    : null;

  const categoryParents =
    category?.parents.sort((a, b) => a.level - b.level) ?? [];

  const breadcrumbItems = category
    ? [
        ...category.parents.map((c) => ({
          label: c.title,
          href: `/products/${categoryParents
            .filter((p) => p.level > c.level)
            .map((p) => p.slug)
            .join("/")}`,
        })),
        {
          label: category.category.title,
          href: `/products/${categorySlug}`,
        },
      ]
    : [{ label: "محصولات" }];

  const queryStr = `${query}`;

  await queryClient.prefetchInfiniteQuery(
    getProductsInfinit(categorySlug, queryStr, sortBy as string, page as string)
  );
  return (
    <div className="container space-y-1  py-3">
      <Breadcrumb items={breadcrumbItems} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">
          {category ? category.category.title : "محصولات"}
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
      {category?.category.description && (
        <CategoryDescription description={category.category.description} />
      )}
    </div>
  );
}
