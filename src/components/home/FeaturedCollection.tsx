import { products } from "@/__MOCK__/catalog";
import React from "react";
import ProductCard from "../common/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import SectionTitle from "../common/SectionTitle";

export default function FeaturedCollection() {
  return (
    <section className="py-6">
      <div className="container space-y-1 relative">
        <SectionTitle title="محصولات ویژه" link="/collection" />
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />
          <CarouselContent>
            {products.slice(0, 16).map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[14rem] sm:basis-[16rem]"
              >
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* کارت محصول نمونه */}
      </div>
    </section>
  );
}
