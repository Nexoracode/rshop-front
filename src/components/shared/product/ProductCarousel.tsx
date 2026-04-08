"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/classnames";
import React from "react";

type Props<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  hiddenSeparator?: boolean;
  CarouselContentClass?: string;
};

export default function ProductCarousel<T>({
  items,
  renderItem,
  hiddenSeparator = false,
  CarouselContentClass,
}: Props<T>) {
  return (
    <Carousel>
      <CarouselNext />
      <CarouselPrevious />
      <CarouselContent className={`${CarouselContentClass}`}>
        {items.map((product, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "basis-[10rem] sm:basis-[11rem]",
              !hiddenSeparator && "border-l last:border-l-0 ",
            )}
          >
            {renderItem(product)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
