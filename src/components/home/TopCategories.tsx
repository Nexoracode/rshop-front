import { HomeCategory } from "@/types/home";
import Link from "next/link";
import Image from "../common/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { chunkArray } from "@/lib/utils";
import { Card } from "../ui/card";

type Props = {
  categories: Array<HomeCategory>;
};

export default function TopCategoriesSection({ categories }: Props) {
  const chunckedCategories = chunkArray(categories, 4);
  return (
    <section className="container py-8">
      <Card>
        <div>
          <h2 className="text-center font-semibold text-base md:text-lg">
            خرید بر اساس دسته بندی
          </h2>
        </div>
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />
          <CarouselContent>
            {chunckedCategories.map((group) => (
              <CarouselItem className="basis-[30rem]" key={group[0].id}>
                <div className="grid grid-cols-2">
                  {group.map((category, i) => (
                    <CategoryItem i={i} key={category.id} {...category} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Card>
    </section>
  );
}

function CategoryItem({ ...cat }: HomeCategory & { i: number }) {
  return (
    <Link
      href={`/category/${cat.slug}`}
      className={`flex flex-col-reverse  items-center p-5 justify-between overflow-hidden`}
    >
      <div className="flex flex-col items-start gap-1">
        <h3 className="text-sm md:text-base text-center mt-2 font-semibold text-gray-800">
          {cat.name}
        </h3>
      </div>
      <div className="relative w-[6rem] h-[6rem]">
        <Image
          src={cat.image || "/category.png"}
          alt={cat.name}
          fill
          className="object-fill border p-0.5 rounded-full"
        />
      </div>
    </Link>
  );
}
