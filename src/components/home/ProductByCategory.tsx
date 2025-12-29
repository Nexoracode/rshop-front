"use client";
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card } from "../ui/card";
import Image from "next/image";
import SectionTitle from "../common/SectionTitle";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";

export default function ProductByCategory({
  sections,
}: {
  sections: Array<HomeSection>;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedSection =
    sections.find((i) => i.id === selectedId) ?? sections[0];

  return (
    <section className="py-6">
      <div className="container space-y-2 relative">
        <SectionTitle
          title="خرید بر اساس دسته بندی"
          link={`/category/${selectedSection.category?.slug}`}
        />

        <div className="flex flex-col md:flex-row">
          <Card
            className="group relative w-full overflow-auto md:w-[240px] md:overflow-hidden border gap-1 !p-2 space-y-0 shadow-sm transition hover:shadow-md"
            dir="rtl"
          >
            <div className="flex min-w-fit md:flex-col flex-nowrap">
              {sections.map(({ category, id }) => (
                <div
                  key={id}
                  role="button"
                  onClick={() => setSelectedId(id)}
                  className="flex w-[200px] md:w-full flex-1 items-center gap-2 p-2 cursor-pointer hover:bg-neutral-100 transition-colors"
                >
                  <Image
                    src={category.image || "/category.png"}
                    width={48}
                    height={48}
                    alt={category.name}
                    className="rounded-xl border border-muted/10 p-0.5"
                  />

                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="w-full mt-7 md:mt-0 md:w-[calc(100%-240px)]">
            <Carousel className="md:px-4">
              <CarouselContent>
                {selectedSection.products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-[14rem] sm:basis-[16rem]"
                  >
                    <HomeProductCard {...product} />
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
