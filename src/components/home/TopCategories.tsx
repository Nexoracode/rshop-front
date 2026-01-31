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

type Props = {
  categories: Array<HomeCategory>;
};

export default function TopCategoriesSection({ categories }: Props) {
  const chunckedCategories = chunkArray(categories, 2);
  return (
    <section>
      <div className="container-home">
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
              <CarouselItem
                className="basis-[7rem] md:basis-[10rem]"
                key={group[0].id}
              >
                <div className=" h-full flex flex-col">
                  {group.map((category, i) => (
                    <CategoryItem i={i} key={category.id} {...category} />
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

function CategoryItem({ ...cat }: HomeCategory & { i: number }) {
  return (
    <Link
      href={`/products/${cat.slug}`}
      className={`flex flex-col flex-1 w-fit mx-auto items-center p-2 justify-between overflow-hidden`}
    >
      <div className="relative w-[4.5rem] aspect-square md:w-[6rem] md:h-[6rem]">
        <Image
          src={cat.image || "/category.png"}
          alt={cat.name}
          fill
          className="object-fill  border p-0.5 rounded-full"
        />
      </div>
      <h3 className="text-xs md:text-base text-center mt-2">{cat.name}</h3>
    </Link>
  );
}
