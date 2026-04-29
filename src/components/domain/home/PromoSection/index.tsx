"use client";

import {
  HeroSlider as HeroSliderType,
  LayoutType,
  SideBanners,
} from "@/types/home";
import { cn } from "@/lib/utils/classnames";
import HeroSlider from "./HeroSlider";
import PromoBanners from "./PromoBanners";

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
  return (
    <section className="bg-white">
      <div
        className={cn(
          "grid grid-cols-1 gap-2 md:gap-4",
          layoutType === "side_by_side"
            ? "container-home  mt-12 md:grid-cols-2"
            : "",
        )}
      >
        <div
          className={cn(
            layoutType === "side_by_side"
              ? "rounded-xl h-[14rem] md:h-auto overflow-hidden"
              : "mt-12 md:mt-0 h-[200px] lg:h-[300px] xl:h-[400px]",
          )}
        >
          <HeroSlider
            layoutType={layoutType}
            slides={heroSliders}
            autoplayMs={6000}
          />
        </div>

        {layoutType !== "side_by_side" ? (
          <div className="mt-2">{children}</div>
        ) : (
          ""
        )}

        <div
          className={cn(
            " grid grid-cols-2 md:gap-2",
            layoutType === "side_by_side"
              ? "sm:grid-cols-2 !gap-4"
              : "container-home md:grid-cols-4 mt-2 gap-2 md:!gap-4",
          )}
        >
          <PromoBanners banners={sideBanners} />
        </div>
      </div>
    </section>
  );
}
