"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/utils/array";
import { HomeSectionProduct } from "@/types/home";
import React from "react";
import ProductListItem from "../ProductListItem";
import { cn } from "@/lib/utils/classnames";

type Props = {
  products: Array<HomeSectionProduct>;
};

export default function ProductListCarousel({ products }: Props) {
  const chunckedProducts = chunkArray(products, 3);
  return (
    <Carousel className="relative group">
      <CarouselNext  />
      <CarouselPrevious />
      <CarouselContent className="px-2 pb-2">
        {chunckedProducts.map((group, groupIndex) => (
          <CarouselItem key={group[0].id} className="!w-fit !max-w-[313px]">
            <div className="flex gap-2 !w-fit flex-col">
              {group.map((product, index) => (
                <ProductListItem
                  key={product.id}
                  {...product}
                  num={groupIndex * 3 + index + 1}
                  className={cn(
                    "border-b",
                    index === group.length - 1 && "border-b-0",
                  )}
                />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
