import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { mockBrands } from "@/__MOCK__/catalog";
import Image from "next/image";
import { Card } from "../ui/card";

export default function BrandsSection() {
  return (
    <section className="py-14">
      <div className="container relative">
        <Card className="py-12">
          <Carousel>
            <CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
              {mockBrands.slice(0, 16).map((brand) => (
                <CarouselItem
                  key={brand.id}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="w-full h-[130px] relative">
                    <Image
                      fill
                      src={brand.logo}
                      alt={brand.name}
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Card>
        {/* کارت محصول نمونه */}
      </div>
    </section>
  );
}
