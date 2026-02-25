import React from "react";
import ProductResultList from "./ProductResultList";
import SearchPrompt from "./SearchPrompt";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import SearchInput from "./SearchInput";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@/types/product";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchTermLink from "./SearchTermLink";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  data: SearchResult | undefined;
  isFetching: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SearchSheet({
  search,
  setSearch,
  debouncedSearch,
  data,
  isFetching,
  open,
  onOpenChange,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hiddenClose
        side="bottom"
        className="w-full h-full px-3 rounded-xs"
      >
        <SheetTitle className="hidden"></SheetTitle>
        <div className="flex pt-3 items-center">
          <SheetClose asChild className="w-fit">
            <Button size={"icon"} variant={"text-nohover"}>
              <ArrowRight size={28} />
            </Button>
          </SheetClose>
          <div className="relative flex-1">
            <SearchInput
              debouncedSearch={debouncedSearch}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>

        {debouncedSearch && (
          <SearchTermLink debouncedSearch={debouncedSearch} />
        )}

        {debouncedSearch ? (
          <ProductResultList
            products={data?.products ?? []}
            isPending={isFetching}
          />
        ) : (
          <SearchPrompt />
        )}

        {data?.categories.length ? (
          <div className="py-3">
            <p className="text-sm font-semibold">جستجو در دسته بندی های: </p>
            <CategoryResultList categories={data.categories ?? []} />
          </div>
        ) : null}
        {data?.brands.length ? (
          <div className="py-3">
            <p className="text-sm font-semibold">جستجو در برندهای: </p>

            <BrandResultList brands={data.brands ?? []} />
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
