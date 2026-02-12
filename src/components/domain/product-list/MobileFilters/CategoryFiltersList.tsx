import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils/classnames";
import { CategoryFilter } from "@/types";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  categories: Array<CategoryFilter>;
};

export default function CategoryFiltersList({ categories }: Props) {
  const getTree = (cat: CategoryFilter, slug = "/collection", level = 0) => {
    return (
      <div className={cn(level > 0 && "pr-2")}>
        <SheetClose asChild>
          <Link
            className={cn(
              "flex items-center font-semibold gap-2 text-xs hover:text-primary text-neutral-600",
            )}
            href={`${slug}/${cat.slug}`}
          >
            {Number(cat.children?.length) > 0 ? (
              <ChevronDownIcon className="size-5" />
            ) : (
              <ChevronLeftIcon className="size-5" />
            )}
            <span className="border-b flex-1 py-3 inline-block">
              {cat.title}
            </span>
          </Link>
        </SheetClose>
        {Number(cat.children?.length) > 0 ? (
          <React.Fragment>
            {cat.children?.map((subCat) => (
              <React.Fragment key={subCat.id}>
                {getTree(subCat, `${slug}/${cat.slug}`, level + 1)}
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : null}
      </div>
    );
  };
  return <div>{categories.map((cat) => getTree(cat))}</div>;
}
