import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Card } from "../../ui/card";
import { Brand } from "@/types/product";
import Link from "next/link";
import Image from "../../common/Image";
import SectionTitle from "@/components/common/SectionTitle";

export default function BrandsSection({ brands }: { brands: Array<Brand> }) {
  return (
    <section>
      <div className="relative container-home">
        <Card className="py-4">
          <SectionTitle center title="محبوب ترین برندها" />
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent className="justify-evenly">
              {brands.map((brand) => (
                <CarouselItem
                  key={brand.id}
                  className="basis-[6rem] md:basis-[10rem] md:border-l last:border-l-0"
                >
                  <Link
                    href={`/brand/${brand.slug}`}
                    className="mx-auto rounded-md border md:border-0  flex gap-1 flex-col items-center"
                  >
                    <div className="w-full bg-muted-light/30 md:bg-white md:w-[6rem] rounded-t-md h-[6rem] block  overflow-hidden relative">
                      <Image
                        fill
                        src={brand.logo}
                        alt={brand.name}
                        className="object-contain object-center"
                      />
                    </div>
                    <span className="text-muted p-1 inline-block md:hidden  text-xs">
                      {brand.name}
                    </span>
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
