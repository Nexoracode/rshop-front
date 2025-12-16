"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
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

export default function HeroSlider({
  slides,
}: {
  slides: Array<HeroSliderType>;
  autoplayMs?: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
      <Carousel opts={{ dragFree: false }}>
        <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]" />

        <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-0 hover:bg-[unset]" />
        <CarouselContent>
          {slides.map((s, idx) => (
            <CarouselItem key={idx}>
              <div className="min-w-full relative">
                <Aspect className="rounded-2xl">
                  <Image
                    src={s.image_url}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute left-0 top-0 w-full h-full z-20 bg-black/20" />
                  <div className="absolute right-0 top-0 z-30 w-full h-full flex flex-col justify-center gap-4 p-2 md:p-5">
                    <h2
                      className={cn(
                        "text-2xl sm:text-4xl text-shadow-blue-400 font-extrabold drop-shadow text-white"
                        //   s.is_dark ? "text-white" : "text-black"
                      )}
                    >
                      {s.title}
                    </h2>
                    {s.description && (
                      <p
                        className={cn(
                          "mt-2  px-3 py-1 text-white"
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
  ratio = 16 / 9,
  className,
}: {
  children: React.ReactNode;
  ratio?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${100 / ratio}%` }}
    >
      {children}
    </div>
  );
}
