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

type Slide = {
  img: string;
  overline?: string;
  title: string;
  text?: string;
  cta?: { label: string; href: string };
};

export default function HeroSlider({
  slides,
}: {
  slides: Slide[];
  autoplayMs?: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
      <Carousel>
        <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]" />

        <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-0 hover:bg-[unset]" />
        <CarouselContent>
          {slides.map((s, idx) => (
            <CarouselItem key={idx}>
              <div className="min-w-full relative">
                <Aspect className="rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="object-cover blur-xs"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
                  <div className="absolute right-0 top-0 w-full h-full flex flex-col justify-between p-2">
                    {s.overline && (
                      <div className="text-primary font-medium mb-2">
                        {s.overline}
                      </div>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 drop-shadow">
                      {s.title}
                    </h2>
                    {s.text && (
                      <p className="mt-2 text-slate-800/90 bg-white/30 backdrop-blur rounded-xl inline-block px-3 py-1">
                        {s.text}
                      </p>
                    )}
                    {s.cta && (
                      <div className="flex justify-end">
                        <Button
                          href={s.cta.href}
                          variant={"fill"}
                          rounded={"full"}
                          endIcon={<ChevronLeft />}
                        >
                          {s.cta.label}
                        </Button>
                      </div>
                    )}
                  </div>
                </Aspect>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-3 right-0 left-0" />
      </Carousel>
      {/* اسلایدها */}
      {/*      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(${i * 100}%)` }}
      ></div> */}

      {/* دات‌ها */}
      {/*   <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`اسلاید ${idx + 1}`}
            onClick={() => goto(idx)}
            className={cn(
              "h-2 w-2 rounded-full transition",
              i === idx ? "bg-slate-900" : "bg-white/70 hover:bg-white"
            )}
          />
        ))}
      </div> */}
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
