import { Category } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  categories: Array<Category>;
};

const CategoryResultList = React.forwardRef<HTMLDivElement, Props>(
  function ResultList({ categories }, ref) {
    return (
      <div ref={ref} className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            className="inline-block hover:text-orange-600 transition-all hover:bg-orange-50 text-sm  bg-neutral-100 rounded-full p-1 px-3"
            href={`/products/${c.slug}`}
          >
            {c.title}
          </Link>
        ))}
      </div>
    );
  },
);

export default CategoryResultList;
