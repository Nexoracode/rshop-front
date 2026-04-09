"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import UserMenu from "./UserMenu";
import PromoBanner from "./PromoBanner";
import LogoLink from "./LogoLink";
import CategoryPageHeader from "./ResponsiveHeaders/CategoryPageHeader";
import ProductPageHeader from "./ResponsiveHeaders/ProductPageHeader";
import SearchBox from "./SearchBox";
import HomePageHeader from "./ResponsiveHeaders/HomePageHeader";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const isMobileHomePage = isMobile && pathName === "/";
  const isMobileProductPage = isMobile && pathName.startsWith("/p/");
  const isMobileCategoryPage = isMobile && pathName.startsWith("/products/");
  return (
    <header className="fixed bg-white top-0 z-50 w-full border-b shadow backdrop-blur">
      <PromoBanner />

      <div className="relative">
        <div className="container-home px-2 bg-white relative z-20 flex text-foreground items-center justify-between py-3 gap-3">
          {isMobile ? (
            <>
              {isMobileCategoryPage && <CategoryPageHeader />}

              {isMobileProductPage && <ProductPageHeader />}

              {isMobileHomePage && <HomePageHeader />}
            </>
          ) : (
            <>
              <div className="w-full flex items-center gap-6">
                <LogoLink />

                <SearchBox />
              </div>

              <UserMenu />
            </>
          )}
        </div>
        <DesktopNav />
      </div>
    </header>
  );
}
