"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

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
          <CarouselItem key={index} className="basis-[10rem] sm:basis-[12rem]">
            {renderItem(product)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
