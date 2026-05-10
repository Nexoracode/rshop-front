import Link from "@/components/shared/Link";
import { ChevronLeft } from "lucide-react";
import { Category } from "@/types/product";

interface SubCategoriesColumnProps {
  category: Category;
  parent: Category;
}

export default function SubCategoriesColumn({
  category,
  parent,
}: SubCategoriesColumnProps) {
  return (
    <div>
      <Link
        href={`/products/${parent.slug}/${category.slug}`}
        className="mb-2 text-sm font-medium text-gray-800 border-r-2 h-4 flex items-center pr-2.5 border-r-primary hover:text-primary hover:bg-transparent"
      >
        {category.title}
        <ChevronLeft size={15} className="inline-block mr-1" />
      </Link>
      <ul className="text-sm text-gray-600">
        {category.children?.map((child) => (
          <li key={child.id}>
            <Link
              href={`/products/${parent.slug}/${category.slug}/${child.slug}`}
              className="hover:text-primary hover:bg-transparent transition"
            >
              {child.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
