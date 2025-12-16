import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { products } from "@/__MOCK__/catalog";
import ProductCard from "../common/ProductCard";
import SectionTitle from "../common/SectionTitle";

export default function RelatedProducts() {
  return (
    <div>
      <SectionTitle title="محصولات مشابه" />
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />

        <CarouselContent>
          {products.slice(8, 20).map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[14rem] sm:basis-[16rem]"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
