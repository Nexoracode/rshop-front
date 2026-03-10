import { Category } from "@/types/product";
import SubCategoriesColumn from "./SubCategoriesColumn";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface SubCategoriesGridProps {
  category: Category;
}

export default function SubCategoriesGrid({
  category,
}: SubCategoriesGridProps) {
  return (
    <div className="flex-1 p-5 max-h-[30rem] overflow-y-auto scrollbar-custom min-w-[500px] w-full">
      <Link
        href={`/products/${category.slug}`}
        className="mb-4 text-sm text-blue-500 font-semibold pb-2"
      >
        مشاهده همه محصولات {category.title}
        <ChevronLeftIcon className="inline-block size-5 mr-1" />
      </Link>
      <div className="grid grid-cols-3 [grid-auto-rows:fit-content(100%)] gap-6 p-4">
        {category.children?.map((category) => (
          <SubCategoriesColumn
            key={category.id}
            category={category}
            parent={category}
          />
        ))}
      </div>
    </div>
  );
}
