"use client";

import {
  HeroSlider as HeroSliderType,
  LayoutType,
  SideBanners,
} from "@/types/home";
import { cn } from "@/lib/utils/classnames";
import HeroSlider from "./HeroSlider";
import PromoBanners from "./PromoBanners";
import usePromotionPadding from "@/hooks/usePromotionPadding";
import useSticky from "@/hooks/useSticky";
import { useEffect, useState } from "react";

type Props = {
  heroSliders: Array<HeroSliderType>;
  sideBanners: Array<SideBanners>;
  layoutType: LayoutType;
  children?: React.ReactNode;
};

export default function PromoSection({
  heroSliders,
  sideBanners,
  layoutType,
  children,
}: Props) {
  const isActiveBanner = usePromotionPadding();
  const isVisibleNav = useSticky();
  const [isActive, setIsActive] = useState<string>("");

  useEffect(() => {
    setIsActive(getTopClass());
  }, [isActiveBanner]);

  const getTopClass = () => {
    if (isVisibleNav.isVisible && isActiveBanner.bannerExists)
      return "md:top-[168px]";
    if (isVisibleNav.isVisible && !isActiveBanner.bannerExists)
      return "md:top-[108px]";
    if (!isVisibleNav.isVisible && isActiveBanner.bannerExists)
      return "md:top-[128px]";
    return "md:top-[68px]";
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:gap-2 md:gap-0",
        layoutType === "side_by_side"
          ? "mt-12 md:my-12 container-home md:grid-cols-2"
          : "",
      )}
    >
      <div
        className={cn(
          isActive,
          layoutType === "side_by_side"
            ? "rounded-xl h-[14rem] md:h-auto overflow-hidden mx-2 md:mr-2"
            : "fixed transition-all duration-300 left-0 right-0 mt-12 md:mt-0 h-[200px] lg:h-[300px] xl:h-[400px]",
        )}
      >
        <HeroSlider
          layoutType={layoutType}
          slides={heroSliders}
          autoplayMs={6000}
        />
      </div>

      <div
        className={`!z-20 bg-white ${layoutType !== "side_by_side" ? `mt-[255px] md:mt-[210px] lg:mt-[310px] xl:mt-[400px]` : ""}`}
      >
        {layoutType !== "side_by_side" ? (
          <div className="pt-2">{children}</div>
        ) : (
          ""
        )}

        <div
          className={cn(
            "grid grid-cols-2 z-10",
            layoutType === "side_by_side"
              ? "sm:grid-cols-2 gap-2 lg:!gap-4 px-2 md:pl-2"
              : "container-home md:grid-cols-4 mt-2 gap-2 lg:!gap-4 px-2",
          )}
        >
          <PromoBanners banners={sideBanners} />
        </div>
      </div>
    </div>
  );
}
