import { products } from "@/__MOCK__/catalog";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import SpecialProductCart from "../common/ProductCard/SpecialProductCart";

export default function SpecialCollection() {
  return (
    <section className="py-6">
      <div className="container relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">محصولات ویژه</h2>
        <Carousel>
          <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]" />

          <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-0 hover:bg-[unset]" />
          <CarouselContent>
            {products
              .filter((i) => i.discount_amount || i.discount_percent)
              .slice(0, 16)
              .map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/3 lg:basis-1/3"
                >
                  <SpecialProductCart {...product} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        {/* کارت محصول نمونه */}
      </div>
    </section>
  );
}
