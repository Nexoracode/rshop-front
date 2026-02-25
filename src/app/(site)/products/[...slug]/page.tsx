import React, { Suspense } from "react";

import { Metadata } from "next";
import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import ProductListContainer from "@/components/domain/product-list/ProductListContainer";
import {
  getCategoryBySlug,
  getCategorySeoDataBySlug,
} from "@/queries/products/category";
import { getQueryClient } from "@/lib/utils/query-client";
import { queryParamToString } from "@/lib/utils/serialize-general";
import ProductListSkelton from "@/components/domain/product-list/Skeleton/ProductListSkelton";
import CategoryDescription from "@/components/domain/category/CategoryDescription";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/products/[...slug]">): Promise<Metadata> {
  const queryClient = getQueryClient();
  const { slug } = await params;
  const categorySlug = slug?.pop() ?? "";
  const category = await queryClient.fetchQuery(
    getCategorySeoDataBySlug(categorySlug),
  );

  if (!category)
    return {
      title: "دسته بندی یافت نشد",
    };

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
  props: PageProps<"/products/[...slug]">,
) {
  const { slug } = await props.params;
  const { query, sortBy, page = "1" } = await props.searchParams;
  const categorySlug = slug?.pop() ?? "";

  const queryClient = getQueryClient();

  const category = await queryClient.fetchQuery(
    getCategoryBySlug(categorySlug),
  );

  if (!category) return notFound();

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

  return (
    <div className="container space-y-1  py-3">
      <Breadcrumb items={breadcrumbItems} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">
          {category ? category.category.title : "محصولات"}
        </h1>
      </div>

      <Suspense fallback={<ProductListSkelton />}>
        <ProductListContainer
          query={queryParamToString(query)}
          page={queryParamToString(page)}
          sortBy={queryParamToString(sortBy)}
          type="category"
          slug={categorySlug}
        />
      </Suspense>

      <Separator />
      {category?.category.description && (
        <CategoryDescription description={category.category.description} />
      )}
    </div>
  );
}
