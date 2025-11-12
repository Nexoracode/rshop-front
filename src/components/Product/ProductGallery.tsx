"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Media } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import MediaPlayer from "../common/MediaPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "../ui/dialog";
import { EllipsisIcon, X, Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ProductGalleryProps {
  images: Array<Media>;
  media_pinned: Media | null;
}

export default function ProductGallery({
  images,
  media_pinned,
}: ProductGalleryProps) {
  const [active, setActive] = React.useState<number | null>(0);
  const isMobile = useIsMobile();
  const sortedImages = [...images].sort((a, b) =>
    a.id === media_pinned?.id ? -1 : b.id === media_pinned?.id ? 1 : 0
  );
  return (
    <div className="space-y-3 mx-auto w-full  md:max-w-lg">
      <Carousel className="mx-auto" opts={{ active: isMobile }}>
        <CarouselContent>
          {sortedImages
            .filter((i) => i.type === "image")
            .map((img, i) => (
              <CarouselItem key={img.id}>
                <div className="relative aspect-square w-[60vw] md:w-auto mx-auto overflow-hidden rounded-lg border">
                  {img.type === "image" ? (
                    <Image
                      src={img.url}
                      alt={img.alt_text ?? ""}
                      fill
                      sizes="(max-width:768px) 100%, 30rem"
                      className="object-contain"
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

        <CarouselPrevious className="hidden " />
        <CarouselNext className="hidden" />
      </Carousel>

      <div className="md:flex hidden justify-start gap-3">
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
              "relative cursor-pointer h-24 w-24 overflow-hidden rounded-md border transition"
            )}
          >
            <Image
              src={media_pinned?.url ?? PRODUCT_PLACEHOLDER}
              alt={`thumbnail`}
              fill
              className="object-contain blur-xs"
            />

            <div className="absolute blur-in-lg w-full h-full" />

            <EllipsisIcon
              fontSize={"48px"}
              className="absolute text-white/80 -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]"
            />
          </div>
        ) : null}
      </div>

      <Dialog
        onOpenChange={(open) => !open && setActive(null)}
        open={Boolean(active)}
      >
        <DialogOverlay className="bg-black/70" />
        <DialogContent
          showCloseButton={false}
          className="bg-transparent flex flex-col justify-center border-0 max-w-full w-full h-full pt-10"
        >
          <DialogTitle></DialogTitle>
          <DialogClose asChild>
            <Button
              variant={"text"}
              className="text-white absolute left-2 top-2"
            >
              <X />
            </Button>
          </DialogClose>
          <Carousel
            className="w-full mx-auto"
            opts={{ loop: true }}
            setApi={(api) =>
              active ? api?.scrollTo(active) : api?.scrollTo(0)
            }
          >
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={img.id}>
                  <div className="relative bg-neutral-400 mx-auto flex flex-col items-center justify-center aspect-square w-full max-w-2xl overflow-hidden rounded-lg">
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
                      <MediaPlayer src={img.url} />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="bg-neutral-50/30 left-[10%] text-white hover:bg-neutral-50/40 shadow-[0px_0px_9px_0.5px_rgb(55,55,55,35)]"
              size={"lg"}
            />
            <CarouselNext
              className="bg-neutral-50/30 right-[10%] text-white hover:bg-neutral-50/40 shadow-[0px_0px_9px_0.5px_rgb(55,55,55,35)]"
              size={"lg"}
            />
          </Carousel>

          <div className="max-w-full absolute bottom-10  scrollbar-custom overflow-auto">
            <div className="flex flex-nowrap gap-2 item justify-center w-full">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ImageTumbnail({
  onClick,
  url,
  type,
  id,
  media_pined,
}: { onClick: () => void; media_pined: Media | null } & Media) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "relative h-24 w-24 flex-1 max-w-24 cursor-pointer overflow-hidden rounded-md bg-white transition"
      )}
    >
      {type === "image" ? (
        <Image
          src={url}
          alt={`thumbnail ${id}`}
          fill
          className="object-contain"
        />
      ) : (
        <div
          style={{ backgroundImage: `url(${media_pined?.url})` }}
          className="flex w-full h-full relative bg-contain items-center justify-center"
        >
          <div className="absolute w-full h-full left-0 top-0 inset-0 bg-white/5 backdrop-blur-xs"></div>

          <Youtube fontSize={32} className="relative z-10 text-primary" />
        </div>
      )}
    </div>
  );
}
