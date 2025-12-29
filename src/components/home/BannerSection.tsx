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

export default function BannerSection({ heroSliders, sideBanners }: Props) {
  console.log({ sideBanners });
  const ordredSideBanners = bannersOrder.map((order) => {
    const banner = sideBanners.find((sb) => sb.position === order.position);

    if (banner) return <PromoCard key={order.position} {...banner} />;

    return <div key={order.position} className="border border-dotted"></div>;
  });

  return (
    <section className="py-14 bg-white">
      <div className="container min-h-[25rem] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* اسلایدشو بزرگ - دو ستون */}
        <div className="">
          <HeroSlider slides={heroSliders} autoplayMs={6000} />
        </div>

        {/* چهار بنر کوچک - یک ستون در موبایل، دو*دو در دسکتاپ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {ordredSideBanners}
        </div>
      </div>
    </section>
  );
}
