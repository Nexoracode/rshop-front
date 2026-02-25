"use client";
import React, { useState } from "react";
import { HomeSection } from "@/types/home";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ProductCartItem from "../ProductCartItem";
import CategoriesList from "./CategoriesList";
import SectionTitle from "@/components/common/SectionTitle";

export default function CategoryBasedSection({
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

        <div className="flex flex-col gap-6 md:flex-row">
          <CategoriesList
            selected={selectedSection.id}
            sections={sections}
            onSelect={setSelectedId}
          />
          <div className="w-full mt-7 md:mt-0 md:w-[calc(100%-240px)]">
            <ProductCarousel
              items={selectedSection.products}
              renderItem={ProductCartItem}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
