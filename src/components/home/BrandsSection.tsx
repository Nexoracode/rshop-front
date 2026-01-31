import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import { Brand } from "@/types/product";
import Link from "next/link";
import Image from "../common/Image";

export default function BrandsSection({ brands }: { brands: Array<Brand> }) {
  return (
    <section>
      <div className="relative container-home">
        <Card className="py-4">
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent className="justify-evenly">
              {brands.map((brand) => (
                <CarouselItem key={brand.id} className="basis-[8rem]">
                  <Link
                    href={`/brand/${brand.slug}`}
                    className="w-[7rem] h-[7rem] block bg-muted-light/30 p-2 rounded-full overflow-hidden relative"
                  >
                    <Image
                      fill
                      src={brand.logo}
                      alt={brand.name}
                      className="object-contain object-center"
                    />
                  </Link>
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
