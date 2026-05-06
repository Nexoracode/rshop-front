import React, { Suspense } from "react";

import { Metadata } from "next";
import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import ProductListContainer from "@/components/domain/product-list/ProductListContainer";
import {
  fetchCategoriesSlugs,
  getCategoryBySlug,
  getCategorySeoDataBySlug,
} from "@/queries/products/category";
import { getQueryClient } from "@/lib/utils/query-client";
import { queryParamToString } from "@/lib/utils/serialize-general";
import ProductListSkelton from "@/components/domain/product-list/Skeleton/ProductListSkelton";
import CategoryDescription from "@/components/domain/category/CategoryDescription";

export const revalidate = 600; // کوتاه‌تر برای محصولات (قیمت/موجودی حساس)

export async function generateStaticParams() {
  const slugs = await fetchCategoriesSlugs();

  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

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

  const breadcrumbItems = category
    ? [
        // Parents
        ...category.parents.map((c, index) => ({
          label: c.title,
          href: `/products/${category.parents
            .slice(0, index + 1)
            .map((p) => p.slug)
            .join("/")}`,
        })),

        // Final category (child)
        {
          label: category.category.title,
          href: `/products/${[
            ...category.parents.map((p) => p.slug),
            category.category.slug,
          ].join("/")}`,
        },
      ]
    : [{ label: "محصولات" }];

  return (
    <div className="container mt-12 md:mt-6">
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-10 mb-6 hidden md:block">
        <h1 className="text-foreground font-bold text-lg">
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

      {category?.category.description && (
        <>
          <Separator />
          <CategoryDescription description={category.category.description} />
        </>
      )}
    </div>
  );
}
