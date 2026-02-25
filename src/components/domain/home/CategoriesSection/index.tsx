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

type Props = {
  categories: Array<HomeCategory>;
};

export default function CategoriesSection({ categories }: Props) {
  const chunckedCategories = chunkArray(categories, 2);
  return (
    <section>
      <div className="container-home space-y-7">
        <div>
          <SectionTitle center title="دسته بندی ها منتخب" />
        </div>
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
      </div>
    </section>
  );
}
