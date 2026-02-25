import React from "react";
import FaqTitle from "./FaqTitle";
import { CircleQuestionMark, ShapesIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import { FaqCategory } from "@/types/home";

type Props = {
  categories: Array<FaqCategory>;
  onSelect: (categoryId: number) => void;
};

export default function FaqCategories({ categories, onSelect }: Props) {
  return (
    <div className="space-y-6 ">
      <FaqTitle label="دسته بندی پرسش ها" icon={ShapesIcon} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {categories.map((cat) => (
          <button
            className={cn(
              "p-5 gap-4 text-sm flex flex-col items-center border-l border-b",
            )}
            key={cat.id}
            onClick={() => onSelect(cat.id)}
          >
            {cat.icon ? (
              <span
                className="text-muted-light [&>svg]:w-9 [&>svg]:h-9"
                dangerouslySetInnerHTML={{ __html: cat.icon.svg }}
              ></span>
            ) : (
              <CircleQuestionMark
                strokeWidth={1.5}
                className="size-9 text-muted-light"
              />
            )}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
