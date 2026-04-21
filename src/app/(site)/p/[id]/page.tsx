// app/p/[id]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

import { fetchProductById } from "@/queries/products/product-details";
import { fetchCategoryBySlug } from "@/queries/products/category";
import { SHOP_NAME, SHOP_URL, PRODUCT_PLACEHOLDER } from "@/data/assets";

import ProductBreadcrump from "@/components/domain/Product/ProductBreadcrump";
import ProductSchema from "@/components/domain/Product/ProductSchema";
import ProductGallery from "@/components/domain/Product/ProductGallery";
import ProductInfo from "@/components/domain/Product/ProductInfo/ProductInfo";
import ProductTabs from "@/components/domain/Product/ProductTabs/ProductTabs";
import ProductDescription from "@/components/domain/Product/ProductTabs/ProductDescription";
import ProductAttributes from "@/components/domain/Product/ProductAttributes";
import ProductSummeryCard from "@/components/domain/Product/ProductSummeryCard";
import ProductFeaturedBanner from "@/components/domain/Product/ProductFeaturedBanner";

import RelatedProducts from "@/components/domain/Product/RelatedProducts";
import ProductReviews from "@/components/domain/Product/ProductReviews";

import SidebarActions from "@/components/domain/Product/SidebarActions";
import ProductReviewsSkeleton from "@/components/domain/Product/ProductReviews/ProductReviewsSkeleton";
import RelatedProductsSkeleton from "@/components/domain/Product/RelatedProductsSkeleton";

export const revalidate = 60; // کوتاه‌تر برای محصولات (قیمت/موجودی حساس)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id.split("-").pop() ?? "";
  const { seo } = await fetchProductById(productId);

  if (!seo) {
    return { title: "محصول یافت نشد", robots: { index: false } };
  }

  const url = `${SHOP_URL}/p/${id}`;

  return {
    title: seo.title,
    description: seo.description?.slice(0, 155) + "...",
    alternates: { canonical: url },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description.slice(0, 155) + "...",
      url,
      images: seo.og_image,
      type: "website",
      locale: "fa_IR",
      siteName: SHOP_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      images: seo.og_image,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id.split("-").pop() ?? "";
  const { product } = await fetchProductById(productId);

  if (!product) notFound();

  const category = product.category?.slug
    ? await fetchCategoryBySlug(product.category.slug)
    : null;

  return (
    <div className="container my-8 md:my-12 space-y-8 min-h-[80vh]">
      {category && <ProductBreadcrump {...category} />}

      <ProductSchema {...product} />

      {product.is_feautered && <ProductFeaturedBanner />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        {/* ستون سمت چپ (گالری + actions sidebar در دسکتاپ) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative flex gap-4">
            {/* actions vertical در دسکتاپ */}
            <div className="hidden lg:flex flex-col gap-4 sticky top-24 self-start">
              <SidebarActions productId={product.id} />
            </div>

            {/* گالری اصلی */}
            <div className="flex-1">
              <ProductGallery
                media_pinned={product.media_pinned}
                images={product.medias}
              />
            </div>
          </div>
        </div>

        <SidebarActions productId={product.id} className="flex lg:hidden !flex-row items-center justify-end pl-2 gap-4 !-mt-4 !-mb-6"/>


        {/* اطلاعات محصول */}
        <div className="lg:col-span-8">
          <ProductInfo {...product} />
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg pt-6">
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts productId={product.id} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:flex gap-8">
        <div className="w-full space-y-6">
          <ProductTabs activeTabs={{ helper: Boolean(product.helper) }} />

          <ProductDescription description={product.description} showMore />

          <Separator />
          {product.specifications.length ? (
            <>
              <ProductAttributes attributes={product.specifications} />

              <Separator />
            </>
          ) : (
            ""
          )}

          <Suspense fallback={<ProductReviewsSkeleton />}>
            <ProductReviews
              product_id={product.id}
              product_image={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
              product_name={product.name}
            />
          </Suspense>
        </div>

        {/* کارت خلاصه در دسکتاپ */}
        <div className="min-w-[318px] lg:sticky lg:top-24 self-start hidden lg:block">
          <ProductSummeryCard {...product} />
        </div>
      </div>

    </div>
  );
}
