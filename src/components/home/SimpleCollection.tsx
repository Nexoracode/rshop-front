import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import SectionTitle from "../common/SectionTitle";

export default function SimpleCollection({
  title,
  products,
  display_style,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  return (
    <section className="py-6">
      <div className="container space-y-1 relative">
        <SectionTitle
          title={"محبوب ترین ها"}
          link={show_view_all_button ? view_all_link : undefined}
        />

        {display_style === "carousel" ? (
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-[12rem] sm:basis-[14rem]"
                >
                  <HomeProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 ">
            {products.map((product) => (
              <HomeProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
