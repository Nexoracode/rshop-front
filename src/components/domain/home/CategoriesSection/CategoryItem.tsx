import Image from "@/components/common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { HomeCategory } from "@/types/home";
import Link from "@/components/shared/Link";

export default function CategoryItem({ name, slug, image }: HomeCategory) {
  return (
    <Link
      href={`/products/${slug}`}
      className={`flex flex-col flex-1 w-fit mx-auto items-center p-2 justify-between overflow-hidden`}
    >
      <div className="relative w-[4.5rem] aspect-square md:w-[6rem] md:h-[6rem]">
        <Image
          src={image || PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className="object-fill  border p-0.5 rounded-full"
        />
      </div>
      <h3 className="text-xs sm:text-sm text-center text-black mt-4">{name}</h3>
    </Link>
  );
}
