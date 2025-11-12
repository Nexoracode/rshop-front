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
import { ArrowRight, ChevronLeftIcon } from "lucide-react";

export default function RelatedProducts() {
  return (
    <div>
      <h4 className="text-primary text-3xl font-semibold mb-1">
        محصولات مشابه
      </h4>
      <Carousel>
        <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]">
          <ChevronLeftIcon />
        </CarouselNext>
        <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-3 hover:bg-[unset]">
          <ArrowRight />
        </CarouselPrevious>
        <CarouselContent>
          {products.slice(8, 20).map((product) => (
            <CarouselItem
              key={product.id}
              className="min-[20rem]:basis-1/2 md:basis-1/4 lg:basis-1/6"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
