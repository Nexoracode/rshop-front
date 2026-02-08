"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { HeroSlider as HeroSliderType } from "@/types/home";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils/classnames";

export default function HeroSlider({
  slides,
}: {
  slides: Array<HeroSliderType>;
  autoplayMs?: number;
}) {
  return (
    <div className="relative h-full overflow-hidden  bg-slate-100">
      <Carousel
        className="h-full"
        opts={{ dragFree: false, loop: true }}
        plugins={[Autoplay({ playOnInit: true, delay: 5000 })]}
      >
        <CarouselNext className="bottom-0 right-[5rem] top-[unset]" />

        <CarouselPrevious className="bottom-0 top-[unset]" />
        <CarouselContent className="aspect-auto h-full">
          {slides.map((s, idx) => (
            <CarouselItem key={idx}>
              <div className="min-w-full h-full relative">
                <Aspect className=" h-full">
                  <Image
                    src={s.image_url}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="object-f object-center"
                    priority
                  />
                  <div className="absolute left-0 top-0 w-full h-full z-20 bg-black/20" />
                  <div className="absolute right-0 top-0 bottom-0 z-30 w-full h-full flex flex-col justify-center gap-4 p-2 md:p-5">
                    <h2
                      className={cn(
                        "text-2xl sm:text-6xl text-shadow-blue-400 font-extrabold drop-shadow text-white",
                        //   s.is_dark ? "text-white" : "text-black"
                      )}
                    >
                      {s.title}
                    </h2>
                    {s.description && (
                      <p
                        className={cn(
                          "mt-2  px-3 py-1 text-white",
                          /*             s.is_dark
                            ? "text-white/60 bg-muted/30"
                            : "text-slate-800/90 bg-white/30" */
                        )}
                      >
                        {s.description}
                      </p>
                    )}
                    {s.button_link && (
                      <Button
                        href={s.button_link}
                        variant={"fill"}
                        rounded={"full"}
                        endIcon={<ChevronLeft />}
                        className="w-fit"
                      >
                        {s.button_text}
                      </Button>
                    )}
                  </div>
                </Aspect>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-3 right-0 left-0" />
      </Carousel>
    </div>
  );
}

/** نسبت تصویر واکنش‌گرا */
function Aspect({
  children,
  className,
}: {
  children: React.ReactNode;
  ratio?: number;
  className?: string;
}) {
  return <div className={cn("relative w-full", className)}>{children}</div>;
}
