"use client";
import { CategoryFilter } from "@/types";
import Link from "next/link";
import React from "react";
import TreeItem from "./TreeSection";
import { useProductFilter } from "./ProductFilterProvider";
import { usePathname } from "next/navigation";

export default function FilterByCategory() {
  const {
    filters: {
      generic: { categories },
    },
  } = useProductFilter();
  const pathName = usePathname();
  const getTree = (cat: CategoryFilter, slug = "/products", level = 0) => {
    if (!cat.children?.length && level !== 0) {
      return (
        <Link
          className="block py-1 text-sm hover:text-primary text-neutral-600 font-light"
          href={`${slug}/${cat.slug}`}
        >
          {cat.title}
        </Link>
      );
    }

    return (
      <TreeItem
        defaultOpen={pathName.includes(cat.slug)}
        slug={`${slug}/${cat.slug}`}
        label={cat.title}
      >
        {cat.children?.map((subCat) => (
          <div className="px-2" key={subCat.id}>
            {getTree(subCat, `${slug}/${cat.slug}`)}
          </div>
        ))}
      </TreeItem>
    );
  };
  return (
    <div className="max-h-[20rem] pe-2 overflow-y-auto scrollbar-custom">
      {categories.map((cat) => (
        <React.Fragment key={cat.id}>{getTree(cat)}</React.Fragment>
      ))}
    </div>
  );
}
