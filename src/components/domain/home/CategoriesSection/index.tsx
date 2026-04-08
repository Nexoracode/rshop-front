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
  console.log(chunckedCategories);
  
  return (
    <section className="container-home space-y-7 mt-12">
      <div>
        <SectionTitle center title="خرید بر اساس دسته‌بندی" />
      </div>
      {isMobile ? (
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />
          <CarouselContent>
            {chunckedCategories.map((group) => (
              <CarouselItem
                className="basis-[6rem] md:basis-[10rem]"
                key={group[0].id}
              >
                <div className="h-full flex flex-col">
                  {group.map((category) => (
                    <CategoryItem key={category.id} {...category} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        chunckedCategories9.map((group) => (
          <div
            className="basis-[6rem] md:basis-[10rem]"
          >
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
