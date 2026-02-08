"use client";
import {
  HeroSlider as HeroSliderType,
  LayoutType,
  SideBanners,
  SideBannersPosition,
} from "@/types/home";
import HeroSlider from "./HeroSlider";
import PromoCard from "./PromoCard";
import { cn } from "@/lib/utils/classnames";

type Props = {
  heroSliders: Array<HeroSliderType>;
  sideBanners: Array<SideBanners>;
  layoutType: LayoutType;
};

const bannersOrder: Array<{ position: SideBannersPosition; order: number }> = [
  {
    order: 1,
    position: "top_right",
  },
  {
    order: 2,
    position: "top_left",
  },
  {
    order: 3,
    position: "bottom_right",
  },
  {
    order: 4,
    position: "bottom_left",
  },
];

export default function BannerSection({
  heroSliders,
  sideBanners,
  layoutType,
}: Props) {
  const ordredSideBanners = bannersOrder.map((order) => {
    const banner = sideBanners.find((sb) => sb.position === order.position);

    if (banner) return <PromoCard key={order.position} {...banner} />;

    return (
      <div
        key={order.position}
        className="border border-dotted rounded-lg"
      ></div>
    );
  });

  return (
    <section className="py-14 bg-white">
      <div
        className={cn(
          "grid grid-cols-1 gap-2",
          layoutType === "side_by_side" ? "container-home md:grid-cols-2" : "",
        )}
      >
        {/* اسلایدشو بزرگ - دو ستون */}
        <div
          className={cn(
            layoutType === "side_by_side"
              ? "rounded-xl min-h-[12rem] overflow-hidden"
              : "h-[25rem]",
          )}
        >
          <HeroSlider slides={heroSliders} autoplayMs={6000} />
        </div>

        {/* چهار بنر کوچک - یک ستون در موبایل، دو*دو در دسکتاپ */}
        <div
          className={cn(
            " grid grid-cols-2 gap-1 md:gap-2",
            layoutType === "side_by_side"
              ? "sm:grid-cols-2"
              : "container md:grid-cols-4",
          )}
        >
          {ordredSideBanners}
        </div>
      </div>
    </section>
  );
}
