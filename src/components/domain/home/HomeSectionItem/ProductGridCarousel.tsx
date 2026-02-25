"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/utils/array";
import { HomeSectionProduct } from "@/types/home";
import React from "react";
import ProductCartItem from "../ProductCartItem";

type Props = {
  products: Array<HomeSectionProduct>;
};

export default function ProductGridCarousel({ products }: Props) {
  const chunckedProducts = chunkArray(products, 4);
  return (
    <Carousel>
      <CarouselContent>
        {chunckedProducts.map((group) => (
          <CarouselItem key={group[0].id} className="basis-[95%]">
            <div className="grid grid-cols-2">
              {group.map((product) => (
                <div
                  key={product.id}
                  className="border-b border-l nth-[3]:border-b-0"
                >
                  <ProductCartItem {...product} />
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
