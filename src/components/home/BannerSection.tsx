"use client";
import {
  HeroSlider as HeroSliderType,
  SideBanners,
  SideBannersPosition,
} from "@/types/home";
import HeroSlider from "./HeroSlider";
import PromoCard from "./PromoCard";

type Props = {
  heroSliders: Array<HeroSliderType>;
  sideBanners: Array<SideBanners>;
};

const bannersOrder: Record<SideBannersPosition, number> = {
  top_right: 1,
  top_left: 2,
  bottom_right: 3,
  bottom_left: 4,
};

export default function BannerSection({ heroSliders, sideBanners }: Props) {
  return (
    <section className="py-14 bg-white">
      <div className="container min-h-[25rem] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* اسلایدشو بزرگ - دو ستون */}
        <div className="">
          <HeroSlider slides={heroSliders} autoplayMs={6000} />
        </div>

        {/* چهار بنر کوچک - یک ستون در موبایل، دو*دو در دسکتاپ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {sideBanners
            .slice(0, 3)
            .sort((a, b) => bannersOrder[a.position] - bannersOrder[b.position])
            .map((p) => (
              <PromoCard key={p.id} {...p} />
            ))}
        </div>
      </div>
    </section>
  );
}
