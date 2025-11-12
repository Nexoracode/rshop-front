"use client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import { searchTerm } from "@/queries/products";
import { Separator } from "@/components/ui/separator";
import SearchInput from "./SearchInput";
import ProductResultList from "./ProductResultList";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import SearchTermLink from "./SearchTermLink";

export default function HeaderSearchBox() {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { isPending, data } = useQuery(searchTerm(debouncedSearch));

  return (
    <div className="relative w-full">
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
            setSearch={(term) => {
              setSearch(term);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          //sideOffset={-35}
          className="w-[min(36rem,90vw)] p-3 rounded-xs"
        >
          <div>
            <p className="font-semibold">محصولات</p>
            <PopoverClose asChild>
              <ProductResultList
                isPending={isPending}
                products={data?.products ?? []}
              />
            </PopoverClose>
          </div>{" "}
          *
          <Separator />
          {data?.categories.length ? (
            <>
              <div className="py-3">
                <p className="text-sm font-semibold">
                  جستجو در دسته بندی های:{" "}
                </p>
                <PopoverClose asChild>
                  <CategoryResultList
                    categories={data.categories ?? []}
                    debouncedSearch={debouncedSearch}
                  />
                </PopoverClose>
              </div>
              <Separator />
            </>
          ) : null}
          {data?.brands.length ? (
            <>
              <div className="py-3">
                <p className="text-sm font-semibold">جستجو در برندهای: </p>
                <PopoverClose asChild>
                  <BrandResultList
                    brands={data.brands}
                    debouncedSearch={debouncedSearch}
                  />
                </PopoverClose>
              </div>
              <Separator />
            </>
          ) : null}
          {debouncedSearch && (
            <PopoverClose asChild>
              <SearchTermLink debouncedSearch={debouncedSearch} />
            </PopoverClose>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
