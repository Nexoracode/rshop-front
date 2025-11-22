import { Category } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  categories: Array<Category>;
};

const CategoryResultList = React.forwardRef<HTMLDivElement, Props>(
  function ResultList({ categories }, ref) {
    return (
      <div ref={ref} className="flex flex-wrap gap-2 mt-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            className="inline-block hover:text-secondary text-sm  bg-neutral-100 rounded-full p-1 px-2"
            href={`/collection/${c.slug}`}
          >
            {c.title}
          </Link>
        ))}
      </div>
    );
  }
);

export default CategoryResultList;
