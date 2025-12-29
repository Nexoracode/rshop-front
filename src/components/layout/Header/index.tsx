"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileSearchBox from "./HeaderSearchBox/MobileSearchBox";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import BackButton from "../../common/BackButton";
import CartIconLink from "./CartIconLink";
import HeaderSearchBox from "./HeaderSearchBox";
import UserMenu from "./UserMenu";
import MainNav from "./MainNav";
import HeaderCategoryPageTitle from "./HeaderCategoryPageTitle";
import { cn } from "@/lib/utils";
import AdsBanner from "./AdsBanner";

export default function Header() {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const isMobileProductPage = isMobile && pathName.startsWith("/p/");
  const isMobileCategoryPage = isMobile && pathName.startsWith("/category/");
  const displayBackBtn = isMobileProductPage || isMobileCategoryPage;
  return (
    <header className="fixed bg-white   top-0 z-50 w-full border-b shadow backdrop-blur">
      {/* <Topbar /> */}
      {/* Main header */}
      <AdsBanner />
      <div className="relative">
        <div className="container px-2 bg-white relative z-20 flex text-foreground items-center justify-between py-3 gap-3">
          {displayBackBtn && <BackButton />}
          {/* دسکتاپ: لوگو */}
          {!isMobileCategoryPage && (
            <Link
              href="/"
              className="text-2xl w-20 aspect-[80/40] relative inline-block font-bold"
            >
              <Image
                fill
                sizes="80px"
                className="size-20"
                alt="فروشگاه آکادمی روح بخش"
                src={"/rshop_logo_h.png"}
              />
            </Link>
          )}

          {isMobileCategoryPage && <HeaderCategoryPageTitle />}

          {/* جستجو */}
          <div className="hidden flex-1 max-w-xl md:block">
            <HeaderSearchBox />
          </div>
          <div
            className={cn(
              "md:hidden flex items-center justify-end ",
              !displayBackBtn && "w-[calc(100%-90px)]"
            )}
          >
            <MobileSearchBox
              isMobileProductPage={isMobileProductPage || isMobileCategoryPage}
            />
          </div>

          {isMobileProductPage && <CartIconLink />}

          {/* آیکون‌ها (دسکتاپ) */}
          <div className="hidden md:block">
            <UserMenu />
          </div>
        </div>
        <MainNav />
      </div>
    </header>
  );
}
