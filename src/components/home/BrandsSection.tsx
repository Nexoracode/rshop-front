import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Card } from "../ui/card";
import { Brand } from "@/types/product";

export default function BrandsSection({ brands }: { brands: Array<Brand> }) {
  return (
    <section className="py-14">
      <div className="container relative">
        <Card className="py-12">
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent>
              {brands.map((brand) => (
                <CarouselItem key={brand.id} className="basis-[14rem]">
                  <div className="w-[7rem] h-[7rem] bg-muted-light/30 p-2 rounded-full overflow-hidden relative">
                    <Image
                      fill
                      src={brand.logo}
                      alt={brand.name}
                      className="object-contain object-center"
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
