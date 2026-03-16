"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/classnames";

import { Media } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../../../ui/carousel";
import MediaPlayer from "../../../common/MediaPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";

import { ArrowRight, EllipsisIcon, PlaySquare, X } from "lucide-react";
import { Button } from "../../../ui/button";
import ImageTumbnail from "./ImageTumbnail";
import BaseDialog from "@/components/common/BaseDialog";
import GalleryCarousel from "./GalleryCarousel";
import { DialogClose } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: Array<Media>;
  media_pinned: Media | null;
}

export default function ProductGallery({
  images,
  media_pinned,
}: ProductGalleryProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const isMobile = useIsMobile();
  const sortedImages = [...images].sort((a, b) =>
    a.id === media_pinned?.id ? -1 : b.id === media_pinned?.id ? 1 : 0,
  );
  return (
    <div className="space-y-3 mx-auto w-full">
      <Carousel className="mx-auto" opts={{ active: isMobile }}>
        <CarouselContent>
          {sortedImages
            .filter((i) => i.type === "image")
            .map((img, i) => (
              <CarouselItem key={img.id}>
                <div className="relative aspect-square w-3/4 mx-auto md:w-full overflow-hidden">
                  {img.type === "image" ? (
                    <Image
                      src={img.url}
                      alt={img.alt_text ?? ""}
                      fill
                      sizes="(max-width:768px) 100%, 30rem"
                      className="object-contain border lg:rounded-lg"
                      priority={i === 0}
                    />
                  ) : (
                    <MediaPlayer src={img.url} />
                  )}
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselDots className="absolute md:hidden left-2 bottom-1 bg-black/20 p-1 z-50 rounded-full" />
      </Carousel>

      <div className="md:flex hidden justify-start gap-1">
        {sortedImages
          .filter((i) => i.type === "image")
          .slice(0, 4)
          .map((img, i) => (
            <ImageTumbnail
              media_pined={media_pinned}
              {...img}
              key={img.id}
              onClick={() => setActive(i)}
            />
          ))}
        {images.length > 6 ? (
          <div
            role="button"
            onClick={() => {
              setActive(6);
            }}
            className={cn(
              "relative cursor-pointer h-24 w-24 overflow-hidden rounded-md border transition",
            )}
          >
            <Image
              src={media_pinned?.url ?? PRODUCT_PLACEHOLDER}
              alt={`thumbnail`}
              fill
              className="object-contain max-w-xl blur-xs"
            />

            <div className="absolute blur-in-lg w-full h-full" />

            <EllipsisIcon
              fontSize={"48px"}
              className="absolute text-white/80 -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]"
            />
          </div>
        ) : null}
      </div>

      <Button
        rounded={"full"}
        onClick={() => setActive(0)}
        className="absolute top-2 left-2 bg-black/40 w-9 h-9 md:hidden"
      >
        <PlaySquare className="size-6 text-white/60" />
      </Button>

      <BaseDialog
        onOpenChange={(open) => !open && setActive(null)}
        open={active !== null}
        width="full"
        hiddenFooter
        className="bg-black/90 h-[100vh] md:!max-h-[100vh] md:rounded-none  border-0 [&>[data-slot=dialog-header]]:hidden"
        content={
          <div className="flex space-y-3 items-center flex-col h-full">
            <div className="border-b flex gap-2 pb-2 justify-between  w-full border-white/60 text-white/60">
              <ArrowRight className="md:hidden" />
              <p className="flex-1">گالری محصول</p>
              <DialogClose asChild>
                <X className="text-white/60" />
              </DialogClose>
            </div>
            <GalleryCarousel active={active} images={images} />
            <div className="max-w-full absolute bottom-10  scrollbar-custom overflow-auto">
              <div className="flex flex-nowrap gap-1 item justify-center w-full">
                {sortedImages.map((img, i) => (
                  <div className="min-w-fit" key={img.id}>
                    <ImageTumbnail
                      media_pined={media_pinned}
                      {...img}
                      onClick={() => setActive(i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
