"use client";
import React, { useState } from "react";
import { HomeSection } from "@/types/home";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ProductCartItem from "../ProductCartItem";
import CategoriesList from "./CategoriesList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CategoryBasedSection({
  sections,
}: {
  sections: Array<HomeSection>;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedSection =
    sections.find((i) => i.id === selectedId) ?? sections[0];

  return (
    <div className="container-home relative">
      <div className="bg-primary-500 flex-col md:flex-row w-full overflow-hidden flex rounded-2xl p-2 md:p-5 md:h-[298px]">
        <div className="md:!min-w-[10rem] flex flex-col items-center">
          <div className="flex md:flex-col justify-between h-full items-center">
            <div className="relative flex md:flex-col-reverse items-center flex-1 justify-evenly w-full">
              <CategoriesList
                selected={selectedSection.id}
                sections={sections}
                onSelect={setSelectedId}
              />
              <div className="absolute md:hidden left-0 flex items-end justify-center w-5 h-full bg-gradient-to-r from-primary-500 from-20% to-white/0 to-100%"></div>
              <div className="absolute hidden bottom-0 right-0 left-0 md:flex items-end justify-center w-full h-5 bg-gradient-to-t from-primary-500 from-20% to-white/0 to-100%"></div>
            </div>

            <Button
              endIcon={<ChevronLeft className="size-4" />}
              variant={"text-nohover"}
              size={"sm"}
              className="text-white"
              href={`/products/${selectedSection.category?.slug}`}
            >
              <span className="hidden text-[13px] md:inline-block">مشاهده</span>{" "}
              دسته
            </Button>
          </div>
        </div>
        <div className="w-full mt-3 md:mt-0 md:w-full md:mr-4">
          <ProductCarousel
            items={selectedSection.products}
            renderItem={ProductCartItem}
            CarouselContentClass="md:pl-44 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
