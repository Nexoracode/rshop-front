"use client";
import { CategoryFilter } from "@/types";
import Link from "next/link";
import React from "react";
import TreeItem from "./TreeSection";
import { useProductList } from "../ProductListProvider";

export default function FilterByCategory() {
  const {
    filters: {
      generic: { categories },
    },
  } = useProductList();
  const getTree = (cat: CategoryFilter) => {
    if (!cat.children?.length) {
      return (
        <Link
          className="block py-2 text-sm hover:text-primary text-neutral-600 font-light"
          href={cat.slug}
        >
          {cat.title}
        </Link>
      );
    }

    return (
      <TreeItem slug={cat.slug} label={cat.title}>
        {cat.children.map((subCat) => (
          <React.Fragment key={subCat.id}>{getTree(subCat)}</React.Fragment>
        ))}
      </TreeItem>
    );
  };
  return (
    <section className="space-y-4">
      <h3 className="text-lg text-primary font-semibold">بر اساس دسته بندی</h3>

      <div>
        {categories.map((cat) => (
          <React.Fragment key={cat.id}>{getTree(cat)}</React.Fragment>
        ))}
      </div>
    </section>
  );
}
