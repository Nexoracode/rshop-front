// components/search/SearchResultsPanel.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { CircleAlertIcon, SearchX } from "lucide-react";
import ProductResultList from "./ProductResultList";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import SearchTermLink from "./SearchTermLink";
import { SearchResult } from "@/types/product";
import Image from "next/image";

interface SearchResultsPanelProps {
  debouncedSearch: string;
  isPending: boolean;
  products: SearchResult["products"];
  categories: SearchResult["categories"];
  brands: SearchResult["brands"];
}

export function SearchResultsPanel({
  debouncedSearch,
  isPending,
  products,
  categories,
  brands,
}: SearchResultsPanelProps) {
  const hasResults =
    !isPending &&
    (products.length > 0 || categories.length > 0 || brands.length > 0);

  return (
    <div className="max-h-[75vh] overflow-y-auto scrollbar-thin p-3">
      {/* حالت لودینگ */}
      {isPending && !!debouncedSearch && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CircleAlertIcon className="size-20 text-gray-300 mb-2.5 animate-spin" />
          <p className="text-gray-500">درحال جستجو...</p>
          <p className="text-gray-400 text-sm mt-1">لطفاً کمی صبر کنید</p>
        </div>
      )}

      {/* نتیجه خالی */}
      {!isPending && debouncedSearch && !hasResults && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Image
            src={"/search.svg"}
            width={110}
            height={200}
            alt="image"
            className="mx-auto"
          />
          <p className="text-gray-500 mt-2">نتیجه‌ای یافت نشد!</p>
          <p className="text-gray-400 text-sm mt-1">عبارت دیگری جستجو کنید.</p>
        </div>
      )}

      {/* محصولات */}
      {products.length > 0 && <ProductResultList products={products} />}

      {/* دسته‌بندی‌ها */}
      {categories.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center flex-wrap justify-between">
            <span className="text-sm font-semibold text-gray-900">
              دسته‌بندی‌ها
            </span>
            <CategoryResultList categories={categories} />
          </div>
        </>
      )}

      {/* برندها */}
      {brands.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center flex-wrap justify-between">
            <span className="text-sm font-semibold text-gray-900">برندها</span>
            <BrandResultList brands={brands} />
          </div>
        </>
      )}

      {/* لینک مشاهده همه نتایج */}
      {hasResults && <SearchTermLink debouncedSearch={debouncedSearch} />}
    </div>
  );
}
