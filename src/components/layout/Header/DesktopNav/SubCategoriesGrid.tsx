import { Category } from "@/types/product";
import SubCategoriesColumn from "./SubCategoriesColumn";
import { ChevronLeftIcon } from "lucide-react";
import Link from "@/components/shared/Link";

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
        className="text-sm text-sky-700 pb-2"
      >
        <ChevronLeftIcon className="inline-block mr-1" size={15} />
        مشاهده همه محصولات {category.title}
      </Link>
      <div className="grid grid-cols-3 [grid-auto-rows:fit-content(100%)] gap-6 mt-7">
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
