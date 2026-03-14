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
};

export default function PromoSection({
  heroSliders,
  sideBanners,
  layoutType,
}: Props) {
  return (
    <section className="bg-white">
      <div
        className={cn(
          "grid grid-cols-1 gap-2",
          layoutType === "side_by_side" ? "container-home md:grid-cols-2" : "",
        )}
      >
        <div
          className={cn(
            layoutType === "side_by_side"
              ? "rounded-xl h-[14rem] md:h-auto overflow-hidden"
              : "h-[11rem] md:h-[22rem]",
          )}
        >
          <HeroSlider
            layoutType={layoutType}
            slides={heroSliders}
            autoplayMs={6000}
          />
        </div>

        <div
          className={cn(
            " grid grid-cols-2 gap-1 md:gap-2",
            layoutType === "side_by_side"
              ? "sm:grid-cols-2"
              : "container-home md:grid-cols-4 mt-4",
          )}
        >
          <PromoBanners banners={sideBanners} />
        </div>
      </div>
    </section>
  );
}
