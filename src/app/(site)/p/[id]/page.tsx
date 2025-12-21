import DesktopTooltip from "@/components/common/DesktopTooltip";
import PageLoader from "@/components/common/PageLoader";
import AddToCompareBtn from "@/components/Product/ProductCard/AddToCompareBtn";
import AddToWishlistBtn from "@/components/Product/ProductCard/AddToWishlistBtn";
import MobileShareBtn from "@/components/Product/ProductCard/MobileShareBtn";
import SharLinkBtn from "@/components/Product/ProductCard/SharLinkBtn";
import Responsive from "@/components/common/Responsive";
import ProductReviewsSkeleton from "@/components/common/Skeleton/ProductReviewsSkeleton";
import RelatedProductsSkeleton from "@/components/common/Skeleton/RelatedProductsSkeleton";
import ProductAttributes from "@/components/Product/ProductAttributes";
import ProductDescription from "@/components/Product/ProductDescription";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductHelper from "@/components/Product/ProductHelper";
import ProductInfo from "@/components/Product/ProductInfo";
import ProductPageProvider from "@/components/Product/ProductProvider";
import ProductSchema from "@/components/Product/ProductSchema";
import ProductTabs from "@/components/Product/ProductTabs";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_PLACEHOLDER, SHOP_NAME, SHOP_URL } from "@/data/assets";
import { getQueryClient } from "@/lib/get-query-client";
import { calcPrice } from "@/lib/utils";
import { getProductById } from "@/queries/products";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { Suspense } from "react";
import ProductSummeryCard from "@/components/Product/ProductSummeryCard";

const ProductReviews = dynamic(
  () => import("@/components/Product/ProductReviews")
);

const RelatedProducts = dynamic(
  () => import("@/components/Product/RelatedProducts")
);

async function getProduct(props: PageProps<"/p/[id]">) {
  const { id } = await props.params;

  const queryClient = getQueryClient();

  const product = await queryClient.fetchQuery(
    getProductById(id.split("-").pop() ?? "")
  );

  return product;
}

export const revalidate = 300;

export async function generateMetadata(
  props: PageProps<"/p/[id]">
): Promise<Metadata> {
  const { product, seo } = await getProduct(props);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SHOP_URL}/p/rsp-${product.id}`;

  const { final } = calcPrice(
    product.price,
    product.discount_amount,
    product.discount_percent
  );

  return {
    title: `${seo.title || product.name} | ${SHOP_NAME}`,
    description: seo.description || `${product.description.slice(0, 155)}...`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} - ${final} تومان`,
      description: seo.description || `${product.description.slice(0, 155)}...`,
      url,
      images: product.medias.map((img) => ({
        url: img.url,
        alt: product.name,
      })),
      type: "website",
      locale: "fa_IR",
      siteName: SHOP_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${final} تومان`,
      images: product.media_pinned?.url,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

export default async function ProductPage(props: PageProps<"/p/[id]">) {
  const { product } = await getProduct(props);

  if (!product) notFound();

  return (
    <div className="container min-h-screen my-10 space-y-5">
      <ProductPageProvider product={product}>
        <Suspense fallback={<PageLoader />}>
          <ProductSchema {...product} />
          <div className="flex flex-col md:flex-row w-full justify-between relative">
            <ProductGallery
              media_pinned={product.media_pinned}
              images={product.medias}
            />

            <ProductInfo {...product} />

            <div className="absolute top-1 right-2 flex flex-col gap-3">
              <DesktopTooltip
                contentProps={{ side: "left" }}
                content="اظافه به علاقه مندی ها"
              >
                <AddToWishlistBtn id={product.id} />
              </DesktopTooltip>
              <DesktopTooltip
                contentProps={{ side: "left" }}
                content="اظافه به لیست مقایسه"
              >
                <AddToCompareBtn productId={product.id} />
              </DesktopTooltip>
              <Responsive visible="desktop">
                <DesktopTooltip
                  contentProps={{ side: "left" }}
                  content="اشتراک گذاری"
                >
                  <SharLinkBtn />
                </DesktopTooltip>
              </Responsive>

              <Responsive visible="mobile">
                <MobileShareBtn />
              </Responsive>
            </div>
          </div>
        </Suspense>

        <div className="flex gap-4 justify-between">
          <div className="">
            <ProductTabs activeTabs={{ helper: Boolean(product.helper) }} />
            <Separator />
            <ProductDescription description={product.description} />
            {product.helper && (
              <>
                <Separator />
                <ProductHelper {...product.helper} />
              </>
            )}
            <Separator />
            <ProductAttributes attributes={product.specifications} />
            <Separator />
            <Suspense fallback={<ProductReviewsSkeleton />}>
              <ProductReviews
                product_id={product.id}
                product_image={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
                product_name={product.name}
              />
            </Suspense>
          </div>

          <ProductSummeryCard {...product} />
        </div>

        <Separator />

        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts />
        </Suspense>
      </ProductPageProvider>
    </div>
  );
}
