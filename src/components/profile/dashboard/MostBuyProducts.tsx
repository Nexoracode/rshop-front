"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function MostBuyProducts({ products }: Props) {
  if (!products.length)
    return (
      <p className="text-sm text-muted-foreground">
        هنوز محصولی را مشاهده نکرده‌اید.
      </p>
    );

  return (
    <section className="w-full">
      <h2 className="font-semibold text-lg mb-3">خرید های پر تکرار شما</h2>
      <Carousel>
        <CarouselNext className="absolute rounded-full -top-8 right-[unset] left-[70px] hover:bg-[unset]" />
        <CarouselPrevious className="absolute rounded-full -top-8 right-[unset] left-0 hover:bg-[unset]" />

        <CarouselContent>
          {products.slice(0, 16).map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1 min-[360px]:basis-[65%] sm:basis-[45%] lg:basis-[38%] xl:basis-[28%]"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
