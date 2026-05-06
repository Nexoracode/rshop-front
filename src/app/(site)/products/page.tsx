import React, { Suspense } from "react";

import { Metadata } from "next";
import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductListContainer from "@/components/domain/product-list/ProductListContainer";

import { queryParamToString } from "@/lib/utils/serialize-general";
import ProductListSkelton from "@/components/domain/product-list/Skeleton/ProductListSkelton";

export const revalidate = 300;

export async function generateMetadata({
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
  const { query, sortBy, page = "1", search = "" } = await props.searchParams;

  return (
    <div className="container mt-12 md:mt-6">
      <Breadcrumb items={[{ label: "محصولات" }]} />
      <div className="mt-10 mb-6 hidden md:block">
        <h1 className="text-foreground font-bold text-lg">{"محصولات"}</h1>
      </div>

      <Suspense fallback={<ProductListSkelton />}>
        <ProductListContainer
          query={queryParamToString(query)}
          page={queryParamToString(page)}
          sortBy={queryParamToString(sortBy)}
          search={queryParamToString(search)}
          slug=""
          type="all"
        />
      </Suspense>
    </div>
  );
}
