"use client";
import React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import UserMenu from "./UserMenu";
import LogoLink from "./LogoLink";
import SearchBox from "./SearchBox";
import DesktopNav from "./DesktopNav";
import MobileHeader from "./MobileHeader";
import PromoBannerWrapper from "./PromoBannerWrapper";

type HeaderProps = {
  showPromoBanner?: boolean;
};

export default function Header({ showPromoBanner = true }: HeaderProps) {
  const mobileScreeen = useIsMobile();
  const isMobile = mobileScreeen === true;

  return (
    <header className="fixed bg-white top-0 z-50 w-full border-b border-slate-200">
      <PromoBannerWrapper showPromoBanner={showPromoBanner} />

      <div className="relative z-50">
        <div className="max-w-[1536px] w-full mx-auto px-2 bg-white relative z-50 flex text-foreground items-center justify-between py-3 gap-3">
          {isMobile ? (
            <MobileHeader />
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
