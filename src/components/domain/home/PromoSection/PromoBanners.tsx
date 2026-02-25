import { SideBanners, SideBannersPosition } from "@/types/home";
import React from "react";
import PromoCard from "./PromoCard";

type Props = {
  banners: Array<SideBanners>;
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

export default function PromoBanners({ banners }: Props) {
  const ordredSideBanners = bannersOrder.map((order) => {
    const banner = banners.find((sb) => sb.position === order.position);

    if (banner) return <PromoCard key={order.position} {...banner} />;

    return (
      <div
        key={order.position}
        className="border border-dotted rounded-lg md:aspect-[4/3] aspect-[6/4]"
      ></div>
    );
  });
  return <>{ordredSideBanners}</>;
}
