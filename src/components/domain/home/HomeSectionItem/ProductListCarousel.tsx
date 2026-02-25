"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/utils/array";
import { HomeSectionProduct } from "@/types/home";
import React from "react";
import ProductListItem from "../ProductListItem";

type Props = {
  products: Array<HomeSectionProduct>;
};

export default function ProductListCarousel({ products }: Props) {
  const chunckedProducts = chunkArray(products, 3);
  return (
    <Carousel>
      <CarouselContent>
        {chunckedProducts.map((group) => (
          <CarouselItem key={group[0].id} className="basis-[16rem]">
            <div className="flex gap-2 flex-col">
              {group.map((product) => (
                <ProductListItem key={product.id} {...product} />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
