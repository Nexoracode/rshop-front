import Image from "@/components/common/Image";
import { cn } from "@/lib/utils/classnames";
import { HomeCategory } from "@/types/home";
import React from "react";

type Props = {
  sections: Array<{ category: HomeCategory; id: number }>;
  onSelect: (id: number) => void;
  selected: number;
};

export default function CategoriesList({
  sections,
  onSelect,
  selected,
}: Props) {
  return (
    <div className="" dir="rtl">
      <div className="flex min-w-fit md:w-[12rem] md:flex-col flex-nowrap">
        {sections.map(({ category, id }) => (
          <div
            key={id}
            role="button"
            onClick={() => onSelect(id)}
            className={cn(
              "flex min-w-fit md:w-full border-l md:border-l-0 px-2 mx-2 last:border-l-0 md:flex-1 items-center gap-1 p-1 cursor-pointer hover:bg-neutral-100 transition-colors",
              selected === id && "bg-primary-100 rounded-lg",
            )}
          >
            <Image
              src={category.image || "/category.png"}
              width={48}
              height={48}
              alt={category.name}
              className="rounded-xl w-8 h-8 md:w-12 md:h-12 border border-muted/10 p-0.5"
            />

            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
