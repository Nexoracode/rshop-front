"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import SearchInput from "./SearchInput";
import ProductResultList from "./ProductResultList";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import { searchTerm } from "@/queries/products/search";
import SearchTermLink from "./SearchTermLink";
import { Circle, CircleAlert, CircleAlertIcon, SearchX } from "lucide-react";

export default function SearchBox() {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { isPending, data } = useQuery(searchTerm(debouncedSearch));

  // داده‌ها با مقدار پیش‌فرض خالی برای جلوگیری از undefined
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const brands = data?.brands ?? [];

  const hasResults =
    !isPending &&
    (products.length > 0 || categories.length > 0 || brands.length > 0);

  return (
    <div className="relative w-full max-w-xl">
      <Popover
        open={!!debouncedSearch}
        onOpenChange={(open) => {
          if (!open) setSearch("");
        }}
      >
        <PopoverTrigger asChild>
          <SearchInput
            search={search}
            debouncedSearch={debouncedSearch}
            setSearch={setSearch}
          />
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[min(36rem,90vw)] rounded-2xl border-0 shadow-lg !p-2 ring-1 ring-black/5 overflow-hidden"
        >
          <div className="max-h-[75vh] overflow-y-auto scrollbar-thin p-3">
            {/* لودینگ */}
            {isPending && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CircleAlertIcon className="size-20 text-gray-300 mb-2.5 animate-spin" />
                <p className="text-gray-500">نتیجه‌ای یافت نشد!</p>
                <p className="text-gray-400 text-sm mt-1">درحال جستجو...</p>
              </div>
            )}

            {/* نتیجه خالی */}
            {!isPending && debouncedSearch && !hasResults && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <SearchX className="size-20 text-gray-300 mb-2.5" />
                <p className="text-gray-500">نتیجه‌ای یافت نشد!</p>
                <p className="text-gray-400 text-sm mt-1">
                  عبارت دیگری جستجو کنید.
                </p>
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
                  <span className="text-sm font-semibold text-gray-900">
                    برندها
                  </span>
                  <BrandResultList brands={brands} />
                </div>
              </>
            )}

            {hasResults ? (
              <SearchTermLink debouncedSearch={debouncedSearch} />
            ) : (
              ""
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
