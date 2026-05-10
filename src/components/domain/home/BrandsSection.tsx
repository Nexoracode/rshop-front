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
import Link from "@/components/shared/Link";
import Image from "../../common/Image";
import { StarIcon } from "lucide-react";

export default function BrandsSection({ brands }: { brands: Array<Brand> }) {
  return (
    <div className="relative container-home md:mt-6">
      <Card className="md:py-4 h-[214px] bg-white rounded-lg border-0 md:border p-0">
        <div className="w-full flex items-center justify-center gap-2 mb-1 md:mb-2">
          <StarIcon size={22} className="text-yellow-500" />
          <p className="text-lg font-medium text-slate-700">
            محبوب ترین برندها
          </p>
        </div>
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
                  className="mx-auto rounded-md border md:border-0  flex gap-1 flex-col items-center select-none"
                >
                  <div className="w-full bg-muted-light/30 md:bg-slate-50 md:w-[6rem] rounded-md h-[6rem] block  overflow-hidden relative">
                    <Image
                      fill
                      src={brand.logo}
                      alt={brand.name}
                      className="object-cover"
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
    </div>
  );
}
