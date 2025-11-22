import DesktopTooltip from "@/components/common/DesktopTooltip";
import PageLoader from "@/components/common/PageLoader";
import AddToCompareBtn from "@/components/common/ProductCard/AddToCompareBtn";
import AddToWishlistBtn from "@/components/common/ProductCard/AddToWishlistBtn";
import MobileShareBtn from "@/components/common/ProductCard/MobileShareBtn";
import SharLinkBtn from "@/components/common/ProductCard/SharLinkBtn";
import Responsive from "@/components/common/Responsive";
import ProductAttributes from "@/components/Product/ProductAttributes";
import ProductDescription from "@/components/Product/ProductDescription";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductHelper from "@/components/Product/ProductHelper";
import ProductInfo from "@/components/Product/ProductInfo";
import ProductPageProvider from "@/components/Product/ProductProvider";
import ProductReviews from "@/components/Product/ProductReviews";
import ProductTabs from "@/components/Product/ProductTabs";
import RelatedProducts from "@/components/Product/RelatedProducts";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { getQueryClient } from "@/lib/get-query-client";
import { getProductById } from "@/queries/products";

import { Suspense } from "react";

export default async function ProductPage(props: PageProps<"/p/[id]">) {
  const { id } = await props.params;

  const queryClient = getQueryClient();

  const product = await queryClient.fetchQuery(
    getProductById(id.split("-").pop() ?? "")
  );

  return (
    <div className="container min-h-screen my-10 space-y-5">
      <Suspense fallback={<PageLoader />}>
        <div className="flex flex-col md:flex-row w-full justify-between relative">
          <ProductPageProvider product={product}>
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
          </ProductPageProvider>
        </div>

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
        <ProductReviews
          product_id={product.id}
          product_image={product.media_pinned?.url || PRODUCT_PLACEHOLDER}
          product_name={product.name}
        />

        <Separator />

        <RelatedProducts />
      </Suspense>
    </div>
  );
}
