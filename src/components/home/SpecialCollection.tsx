import React from "react";
import SectionTitle from "../common/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { chunkArray } from "@/lib/utils";
import SpecialProductCart from "./SpecialProductCart";
import { HomeSection } from "@/types/home";

export default function SpecialCollection({
  products,
  display_style,
  title,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  const chunckedProducts = chunkArray(products, 2);
  return (
    <section className="py-6">
      <div className="container space-y-2 relative">
        <SectionTitle
          title={title}
          link={show_view_all_button ? view_all_link : undefined}
        />
        {display_style === "carousel" ? (
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent>
              {chunckedProducts.map((group) => (
                <CarouselItem
                  className="basis-[20rem] sm:basis-[50%] lg:basis-[33.3333%] xl:basis-[25%] space-y-2"
                  key={group[0].id}
                >
                  {group.map((product) => (
                    <SpecialProductCart key={product.id} {...product} />
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <SpecialProductCart key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
