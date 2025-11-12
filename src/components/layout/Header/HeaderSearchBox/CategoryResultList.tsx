import { Category } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  categories: Array<Category>;
  debouncedSearch: string;
};

export default function CategoryResultList({
  categories,
  debouncedSearch,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          className="inline-block hover:text-secondary text-sm  bg-neutral-100 rounded-full p-1 px-2"
          href={{
            pathname: `/collection/${c.slug}`,
            query: { search: debouncedSearch },
          }}
        >
          {c.title}
        </Link>
      ))}
    </div>
  );
}
