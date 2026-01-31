"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import SectionTitle from "../common/SectionTitle";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import ProductCarousel from "../common/ProductCarousel";

export default function ProductByCategory({
  sections,
}: {
  sections: Array<HomeSection>;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedSection =
    sections.find((i) => i.id === selectedId) ?? sections[0];

  return (
    <section>
      <div className="container-home relative">
        <SectionTitle
          title="خرید بر اساس دسته بندی"
          link={`/products/${selectedSection.category?.slug}`}
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
                  className="flex min-w-fit md:w-full flex-1 items-center gap-1 p-1 cursor-pointer hover:bg-neutral-100 transition-colors"
                >
                  <Image
                    src={category.image || "/category.png"}
                    width={48}
                    height={48}
                    alt={category.name}
                    className="rounded-xl w-12 h-12 flex-1 md:flex-0  border border-muted/10 p-0.5"
                  />

                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="w-full mt-7 md:mt-0 md:w-[calc(100%-240px)]">
            <ProductCarousel
              items={selectedSection.products}
              renderItem={HomeProductCard}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
