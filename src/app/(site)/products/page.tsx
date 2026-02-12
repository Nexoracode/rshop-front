import React, { Suspense } from "react";

import { Metadata } from "next";
import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollectionSkelton from "@/components/category/CollectionSkelton";
import ProductListContainer from "@/components/domain/product-list/ProductListContainer";

import { SortItem } from "@/types/product";
import { queryParamToString } from "@/lib/utils/serialize-general";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/products/[...slug]">): Promise<Metadata> {
  const { page = "1" } = await searchParams;

  const currentPage = Number(page as string);

  const baseUrl = `${SHOP_URL}/products`;
  const currentUrl =
    currentPage > 1 ? `${baseUrl}?page=${currentPage}` : baseUrl;
  const title = `${"محصولات "}${SHOP_NAME}`;
  const description = `${"محصولات فروشگاه آرشاپ"}${SHOP_NAME}`;

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
export default async function ShopPage(props: PageProps<"/products">) {
  const { query, sortBy, page = "1" } = await props.searchParams;

  return (
    <div className="container space-y-1  py-3">
      <Breadcrumb items={[{ label: "محصولات" }]} />
      <div className="pt-10 hidden md:block">
        <h1 className="text-foreground font-semibold text-base">{"محصولات"}</h1>
      </div>

      <Suspense fallback={<CollectionSkelton />}>
        <ProductListContainer
          query={queryParamToString(query)}
          page={queryParamToString(page)}
          sortBy={queryParamToString(sortBy)}
          slug=""
          type="all"
        />
      </Suspense>
    </div>
  );
}
