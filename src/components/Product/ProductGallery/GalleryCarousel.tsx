"use client";
import AdvancedMediaPlayer from "@/components/common/MediaPlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Media } from "@/types";
import Image from "next/image";
import React from "react";

type Props = {
  active: number | null;
  images: Array<Media>;
};

export default function GalleryCarousel({ active, images }: Props) {
  return (
    <Carousel
      className="w-full flex flex-col justify-center flex-1 mx-auto"
      opts={{ loop: true, dragFree: false }}
      setApi={(api) => (active ? api?.scrollTo(active) : api?.scrollTo(0))}
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={img.id}>
            <div className="relative bg-white mx-auto flex flex-col items-center justify-center aspect-square w-full max-w-2xl overflow-hidden rounded-sm">
              {img.type === "image" ? (
                <Image
                  src={img.url}
                  alt={img.alt_text ?? ""}
                  fill
                  sizes="(max-width:768px) 400px, 800vw"
                  className="object-contain"
                  priority={i === 0}
                />
              ) : (
                <AdvancedMediaPlayer src={img.url} />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
