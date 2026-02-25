"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

type Props<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export default function ProductCarousel<T>({ items, renderItem }: Props<T>) {
  return (
    <Carousel>
      <CarouselNext />
      <CarouselPrevious />
      <CarouselContent>
        {items.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-[10rem] border-l last:border-l-0 sm:basis-[12rem]"
          >
            {renderItem(product)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
