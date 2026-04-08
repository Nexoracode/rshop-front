"use client";
import React, { useState } from "react";
import { HomeSection } from "@/types/home";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ProductCartItem from "../ProductCartItem";
import CategoriesList from "./CategoriesList";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import CountdownTimer from "../../Product/CountdownTimer";
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
      <div className="bg-[#29A28B] flex-col md:flex-row w-full overflow-hidden flex rounded-2xl p-2 md:p-5 h-[298px]">
        <div className="md:!min-w-[10rem] flex flex-col items-center">
          <div className="flex md:flex-col justify-between h-full items-center">
            <div className="flex md:flex-col-reverse items-center flex-1 justify-evenly w-full">
              <CategoriesList
                selected={selectedSection.id}
                sections={sections}
                onSelect={setSelectedId}
              />
            </div>

            <Button
              endIcon={<ChevronLeft className="size-4" />}
              variant={"text-nohover"}
              size={"sm"}
              className="text-white"
              href={`/products/${selectedSection.category?.slug}`}
            >
              <span className="hidden text-[13px] md:inline-block">مشاهده</span>{" "}
              همه
            </Button>
          </div>
        </div>
        <div className="w-full mt-7 md:mt-0 md:w-full mr-4">
          <ProductCarousel
            items={selectedSection.products}
            renderItem={ProductCartItem}
            CarouselContentClass="pl-44 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
