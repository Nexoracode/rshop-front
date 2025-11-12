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

export default function Header() {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const isMobileProductPage = isMobile && pathName.startsWith("/p/");
  return (
    <header className="fixed bg-white   top-0 z-50 w-full border-b shadow backdrop-blur">
      {/* <Topbar /> */}
      {/* Main header */}
      <div className="relative">
        <div className="container px-2 bg-white relative z-20 flex text-foreground items-center justify-between py-3 gap-3">
          {isMobileProductPage && <BackButton />}
          {/* دسکتاپ: لوگو */}
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

          {/* جستجو */}
          <div className="hidden flex-1 max-w-xl md:block">
            <HeaderSearchBox />
          </div>
          <div className="md:hidden flex items-center justify-end w-[calc(100%-90px)]">
            <MobileSearchBox isMobileProductPage={isMobileProductPage} />
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
