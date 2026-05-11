"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import React from "react";
import ProductsListPageHeader from "./ResponsiveHeaders/ProductsListPageHeader";
import ProductPageHeader from "./ResponsiveHeaders/ProductPageHeader";
import HomePageHeader from "./ResponsiveHeaders/HomePageHeader";

export default function MobileHeader() {
  const pathName = usePathname();
  const mobileScreeen = useIsMobile();
  const isMobile = mobileScreeen === true;
  const isMobileHomePage = isMobile && pathName === "/";
  const isMobileProductPage = isMobile && pathName.startsWith("/p/");
  const isMobileCategoryPage = isMobile && pathName.includes("/products");
  const isMobileBrandPage = isMobile && pathName.includes("/brand");
  const isCategoriesListInMobile = isMobile && pathName.includes("/categories");
  const isCollectionInMobile = isMobile && pathName.includes("/collection");
  return (
    <>
      {isMobileCategoryPage || isMobileBrandPage ? (
        <ProductsListPageHeader
          isBrandPage={isMobileBrandPage}
          isCategoryPage={isMobileCategoryPage}
          isShopPage={pathName === "/products"}
        />
      ) : (
        ""
      )}

      {isMobileProductPage && <ProductPageHeader />}

      {(isMobileHomePage ||
        isCategoriesListInMobile ||
        isCollectionInMobile) && <HomePageHeader />}
    </>
  );
}
