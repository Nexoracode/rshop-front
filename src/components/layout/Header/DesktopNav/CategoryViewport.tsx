// components/navigation/CategoryViewport.tsx
import { Category } from "@/types/product";
import MainCategoriesList from "./MainCategoriesList";
import SubCategoriesGrid from "./SubCategoriesGrid";
import { useState } from "react";

interface CategoryViewportProps {
  categories: Category[];
}

export default function CategoryViewport({
  categories,
}: CategoryViewportProps) {
  const [selected, setSelected] = useState<number>(() => categories[0]?.id);
  const selectedCategory =
    categories?.find((cat) => cat.id === selected) ?? categories[0];
  if (categories.length === 0) {
    return (
      <div className="p-10 text-center text-muted-foreground min-h-[300px] flex items-center justify-center">
        هیچ دسته‌بندی‌ای یافت نشد
      </div>
    );
  }

  return (
    <div className="grid  grid-cols-1 md:grid-cols-[220px_1fr]">
      {/* ستون دسته‌های اصلی */}
      <MainCategoriesList
        onSelect={setSelected}
        selected={selected}
        sections={categories}
      />

      {/* گرید زیرمجموعه‌ها */}
      <SubCategoriesGrid category={selectedCategory} />
    </div>
  );
}
