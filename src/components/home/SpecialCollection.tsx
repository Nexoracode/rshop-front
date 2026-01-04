import React from "react";
import SectionTitle from "../common/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { chunkArray, cn } from "@/lib/utils";
import SpecialProductCart from "./SpecialProductCart";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";

export default function SpecialCollection({
  products,
  display_style,
  title,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  const ProductCard =
    display_style === "list" ? SpecialProductCart : HomeProductCard;
  return (
    <section className="py-6">
      <div className="container border rounded-lg space-y-2 p-2 relative">
        <SectionTitle
          title={title}
          link={show_view_all_button ? view_all_link : undefined}
        />
        {display_style === "carousel" ? (
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem className="basis-[16rem]" key={product.id}>
                  <HomeProductCard key={product.id} {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex flex-wrap flex-1 gap-2">
            {products.map((product, index) => (
              <div
                className={cn(
                  display_style === "grid"
                    ? "basis-[16rem]"
                    : "xl:basis-[calc(25%-8px)]"
                )}
                key={product.id}
              >
                <ProductCard
                  {...product}
                  {...(display_style === "list" ? { num: index + 1 } : {})}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
