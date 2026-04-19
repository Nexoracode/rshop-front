"use client";

import { HomeCategory } from "@/types/home";

import { chunkArray } from "@/lib/utils/array";
import CategoryItem from "./CategoryItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/common/SectionTitle";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  categories: Array<HomeCategory>;
};

export default function CategoriesSection({ categories }: Props) {
  const chunckedCategories = chunkArray(categories, 2);
  const chunckedCategories9 = chunkArray(categories, 9);
  const isMobile = useIsMobile(1336);

  return (
    <section className="container-home space-y-4 md:space-y-7 mt-8 md:mt-12">
      <SectionTitle center title="خرید بر اساس دسته‌بندی" />
      {isMobile ? (
        <Carousel className="relative">
          <CarouselNext className="flex"/>
          <CarouselPrevious className="flex"/>
          <CarouselContent>
            {chunckedCategories.map((group, index) => (
              <CarouselItem
                className="basis-[6rem] md:basis-[10rem]"
                key={index}
              >
                <div className="h-full flex flex-col">
                  {group.map((category, index) => (
                    <CategoryItem key={index} {...category} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        chunckedCategories9.map((group, index) => (
          <div key={index} className="basis-[6rem] md:basis-[10rem]">
            <div className="h-full flex">
              {group.map((category) => (
                <CategoryItem key={category.id} {...category} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
