"use client";

import { HeroSlider as HeroSliderType, LayoutType } from "@/types/home";
import Autoplay from "embla-carousel-autoplay";
import HeroSliderItem from "./HeroSliderItem";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/classnames";

export default function HeroSlider({
  slides,
  layoutType,
}: {
  slides: Array<HeroSliderType>;
  autoplayMs?: number;
  layoutType: LayoutType;
}) {
  return (
    <Carousel
      className="h-full"
      opts={{ dragFree: false, loop: true , align : "center" }}
      plugins={[Autoplay({ playOnInit: true, delay: 5000 })]}
    >
      <CarouselNext className="bottom-6 right-32 top-[unset]" />
      <CarouselPrevious className="bottom-6 right-14 top-[unset]" />
      
      <CarouselContent className="aspect-auto h-full">
        {slides.map((sliderItem) => (
          <CarouselItem className={cn(layoutType === "stacked" && "basis-[95%] md:basis-full")} key={sliderItem.id}>
            <HeroSliderItem layoutType={layoutType} {...sliderItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="absolute bottom-5 right-0 left-0" />
    </Carousel>
  );
}
