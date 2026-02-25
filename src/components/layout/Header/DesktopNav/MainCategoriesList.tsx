import { Category } from "@/types/product";
import { ChevronLeftIcon } from "lucide-react";
import React from "react";

type Props = {
  sections: Array<Category>;
  onSelect: (id: number) => void;
  selected: number;
};

export default function MainCategoriesList({
  sections,
  onSelect,
  selected,
}: Props) {
  return (
    <div className="flex md:flex-col flex-nowrap  overflow-auto scrollbar-custom  bg-gray-100">
      {sections.map((category) => (
        <div
          key={category.id}
          role="button"
          onMouseEnter={() => onSelect(category.id)}
          className={`w-full px-2 py-4 flex items-center justify-between text-right text-sm hover:bg-gray-200 transition ${
            selected === category.id ? "bg-white font-bold text-primary" : ""
          }`}
        >
          <span className="text-sm">{category.title}</span>
          <ChevronLeftIcon className="size-4 text-gray-400" />
        </div>
      ))}
    </div>
  );
}
