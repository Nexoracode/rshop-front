"use client";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../../../ui/sheet";
import { Button } from "../../../ui/button";
import { cn } from "@/lib/utils";

import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import { searchTerm } from "@/queries/products";
import SearchInput from "./SearchInput";
import ProductResultList from "./ProductResultList";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import SearchTermLink from "./SearchTermLink";

export default function MobileSearchBox({
  isMobileProductPage,
}: {
  isMobileProductPage: boolean;
}) {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { data, isFetching } = useQuery(searchTerm(debouncedSearch));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          {!isMobileProductPage && (
            <Input
              dir="rtl"
              placeholder="جستجوی محصول..."
              disabled
              className="rounded-md bg-neutral-200 p-5 text-black pe-10"
            />
          )}
          <button
            className={cn(
              "text-primary absolute left-0  top-[50%] -translate-y-[50%]",
              !isMobileProductPage && "px-4 -left-1"
            )}
          >
            <Search />
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        hiddenClose
        side="bottom"
        className="w-full h-full px-3 rounded-xs"
      >
        <SheetTitle className="hidden"></SheetTitle>
        <SheetClose asChild className="w-fit">
          <Button size={"icon"} variant={"text"}>
            <ArrowRight size={28} />
          </Button>
        </SheetClose>
        <div className="relative">
          <SearchInput
            debouncedSearch={debouncedSearch}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {debouncedSearch && (
          <SheetClose asChild>
            <SearchTermLink debouncedSearch={debouncedSearch} />
          </SheetClose>
        )}

        <SheetClose asChild>
          <ProductResultList
            products={data?.products ?? []}
            isPending={isFetching}
          />
        </SheetClose>

        {data?.categories.length ? (
          <div className="py-3">
            <p className="text-sm font-semibold">جستجو در دسته بندی های: </p>
            <SheetClose asChild>
              <CategoryResultList
                categories={data.categories ?? []}
                debouncedSearch={debouncedSearch}
              />
            </SheetClose>
          </div>
        ) : null}
        {data?.brands.length ? (
          <div className="py-3">
            <p className="text-sm font-semibold">جستجو در برندهای: </p>
            <SheetClose asChild>
              <BrandResultList
                brands={data.brands ?? []}
                debouncedSearch={debouncedSearch}
              />
            </SheetClose>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
