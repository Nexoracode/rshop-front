"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { categories, products } from "@/__MOCK__/catalog";
import ProductCard from "../common/ProductCard";
import { Card } from "../ui/card";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRight } from "lucide-react";
import { Category } from "@/types/product";

export default function ProductByCategory() {
  const [category, setCategory] = useState<Category | null>(null);

  const select = category ?? categories[0];
  return (
    <section className="py-6">
      <div className="container relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          محبوب ترین محصولات
        </h2>

        <div className="flex flex-col md:flex-row">
          <Card
            className="group relative w-full overflow-auto md:w-[240px] md:overflow-hidden border gap-1 !p-2 space-y-0 shadow-sm transition hover:shadow-md"
            dir="rtl"
          >
            <div className="flex min-w-fit md:flex-col flex-nowrap">
              {categories.slice(0, 6).map((cat) => (
                <div
                  key={cat.id}
                  role="button"
                  onClick={() => setCategory(cat)}
                  className="flex w-[200px] md:w-full flex-1 items-center gap-2 p-2 cursor-pointer hover:bg-neutral-100 transition-colors"
                >
                  <Image
                    src={`${cat.media?.url}`}
                    width={40}
                    height={40}
                    alt={cat.title}
                    className="rounded-xl"
                  />

                  <span>{cat.title}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="w-full mt-7 md:mt-0 md:w-[calc(100%-240px)]">
            <Carousel className="md:px-4">
              <CarouselNext className="absolute rounded-full -top-36 md:-top-8 right-[unset] left-[70px] hover:bg-[unset]">
                <ChevronLeftIcon />
              </CarouselNext>
              <CarouselPrevious className="absolute rounded-full -top-36 md:-top-8 right-[unset] left-0 hover:bg-[unset]">
                <ChevronRight />
              </CarouselPrevious>
              <CarouselContent>
                {products
                  .filter((i) =>
                    [
                      i.category_id,
                      i.category?.parent_id,
                      i.category?.parent?.parent_id,
                    ].includes(select.id)
                  )
                  .slice(0, 12)
                  .map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="basis-1 min-[360px]:basis-1/2 md:basis-1/3 lg:basis-1/5"
                    >
                      <ProductCard {...product} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
