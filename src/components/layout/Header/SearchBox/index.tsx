"use client";
import {
  Popover,
  PopoverClose,
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

export default function SearchBox() {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { isPending, data } = useQuery(searchTerm(debouncedSearch));

  const handleClose = () => {
    setSearch("");
  };

  return (
    <div className="relative w-full">
      <div className="max-w-xl">
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
            className="w-[min(36rem,90vw)] p-3 !rounded-lg"
            onClick={handleClose}
          >
            <div>
              <p className="font-medium">محصولات</p>
              <PopoverClose asChild>
                <ProductResultList
                  isPending={isPending}
                  products={data?.products ?? []}
                />
              </PopoverClose>
            </div>{" "}
            <Separator />
            {data?.categories.length ? (
              <>
                <div className="py-3">
                  <p className="text-sm font-medium">
                    جستجو در دسته بندی های:{" "}
                  </p>
                  <CategoryResultList categories={data.categories ?? []} />
                </div>
                <Separator />
              </>
            ) : null}
            {data?.brands.length ? (
              <div className="py-3">
                <p className="text-sm font-medium">جستجو در برندهای: </p>
                <BrandResultList brands={data.brands} />
              </div>
            ) : null}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
