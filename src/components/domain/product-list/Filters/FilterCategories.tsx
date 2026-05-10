"use client";

import { CategoryFilter } from "@/types";
import Link from "@/components/shared/Link";
import React from "react";

import { usePathname } from "next/navigation";
import Collapsible from "./Collapsible";
import { ChevronLeftIcon } from "lucide-react";

type FilterCategoriesProps = {
  categories: CategoryFilter[];
};

const FilterCategories: React.FC<FilterCategoriesProps> = ({ categories }) => {
  const pathName = usePathname();

  const getTree = (cat: CategoryFilter, slug = "/products") => {
    if (!cat.children?.length) {
      return (
        <Link
          className="py-1 text-sm hover:text-primary flex items-center justify-between text-neutral-600 font-normal"
          href={`${slug}/${cat.slug}`}
        >
          <span>{cat.title}</span>
          <ChevronLeftIcon
            className={"text-slate-500"}
            width={18}
            height={18}
          />
        </Link>
      );
    }

    return (
      <Collapsible
        defaultOpen={pathName.includes(cat.slug)}
        slug={`${slug}/${cat.slug}`}
        label={cat.title}
        activeSeprator={false}
      >
        <div className={`bg-slate-50 pr-3 mt-3`}>
          {cat.children?.map((subCat) => (
            <div
              key={subCat.id}
              className="border-b last:!border-0 py-3 border-[#f2f2f2]"
            >
              {getTree(subCat, `${slug}/${cat.slug}`)}
            </div>
          ))}
        </div>
      </Collapsible>
    );
  };

  return (
    <div
      className={`relative overflow-y-auto scrollbar-custom ${categories.length >= 6 ? "pl-2 -ml-3" : ""} max-h-[20rem]`}
    >
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border-b last:border-0 py-4 last:!pb-0 border-[#f2f2f2]"
        >
          {getTree(cat)}
        </div>
      ))}
    </div>
  );
};

export default FilterCategories;
