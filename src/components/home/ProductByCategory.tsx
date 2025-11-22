"use client";
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { categories, products } from "@/__MOCK__/catalog";
import ProductCard from "../common/ProductCard";
import { Card } from "../ui/card";
import Image from "next/image";
import { Category } from "@/types/product";
import SectionTitle from "../common/SectionTitle";

export default function ProductByCategory() {
  const [category, setCategory] = useState<Category | null>(null);

  const select = category ?? categories[0];
  return (
    <section className="py-6">
      <div className="container space-y-2 relative">
        <SectionTitle
          title="خرید بر اساس دسته بندی"
          link={`/collection/${category?.slug}`}
        />

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
                      className="basis-[14rem] sm:basis-[16rem]"
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
