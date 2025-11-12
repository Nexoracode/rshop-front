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

export default function FeaturedCollection() {
  return (
    <section className="py-6">
      <div className="container relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">محصولات ویژه</h2>
        <Carousel>
          <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]" />
          <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-0 hover:bg-[unset]" />

          <CarouselContent>
            {products.slice(0, 16).map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1 min-[360px]:basis-1/2 md:basis-1/4 lg:basis-1/6"
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
