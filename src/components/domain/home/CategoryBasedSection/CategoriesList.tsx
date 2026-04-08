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
    <div
      className="overflow-scroll no-scrollbar max-h-[226px] h-full"
      dir="rtl"
    >
      <div className="flex min-w-fit md:w-[10rem] md:flex-col gap-2 flex-nowrap">
        {sections.map(({ category, id }) => (
          <div
            key={id}
            role="button"
            onClick={() => onSelect(id)}
            className={cn(
              "flex flex-col md:flex-row min-w-fit md:w-full px-2 md:flex-1 items-center gap-1 p-1.5 cursor-pointer transition-colors rounded-lg overflow-hidden",
              "",
              selected === id && "bg-primary-300 rounded-lg",
            )}
          >
            <Image
              src={category.image || "/category.png"}
              width={48}
              height={48}
              alt={category.name}
              className={`w-14 h-14 md:w-12 md:h-12 border border-white rounded-full`}
            />

            <span className={`text-xs font-bold mt-1 md:mt-0 md:text-[15px] ${selected === id ? "text-black" : "text-white"} pr-2`}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
