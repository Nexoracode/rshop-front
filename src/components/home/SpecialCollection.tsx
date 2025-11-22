import { products } from "@/__MOCK__/catalog";
import React from "react";
import SpecialProductCart from "../common/ProductCard/SpecialProductCart";
import SectionTitle from "../common/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { chunkArray } from "@/lib/utils";

export default function SpecialCollection() {
  const groupedProducts = chunkArray(
    products
      .filter((i) => i.discount_amount || i.discount_percent)
      .slice(0, 16),
    2
  );
  return (
    <section className="py-6">
      <div className="container space-y-2 relative">
        <SectionTitle title="محصولات تخفیف دار" link="/collection" />
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />
          <CarouselContent>
            {groupedProducts.map((group) => (
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
      </div>
    </section>
  );
}
