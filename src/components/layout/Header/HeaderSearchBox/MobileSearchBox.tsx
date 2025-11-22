"use client";
import { ArrowRight, Search } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "../../../ui/sheet";
import { Button } from "../../../ui/button";
import { cn } from "@/lib/utils";

import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import { searchTerm } from "@/queries/products";
import SearchInput from "./SearchInput";
import ProductResultList from "./ProductResultList";
import CategoryResultList from "./CategoryResultList";
import BrandResultList from "./BrandResultList";
import SearchPrompt from "./SearchPrompt";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileSearchBox({
  isMobileProductPage,
}: {
  isMobileProductPage: boolean;
}) {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { data, isFetching } = useQuery(searchTerm(debouncedSearch));
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (debouncedSearch && open) {
      setOpen(false);
      setSearch("");
    }
  }, [pathName, debouncedSearch, open, setSearch]);

  const onOpenChange = (op: boolean) => {
    if (!op) {
      setSearch("");
    }
  };

  return (
    <React.Fragment>
      <div className="relative w-full">
        {!isMobileProductPage && (
          <button
            onClick={() => setOpen(true)}
            className="rounded-md !w-full block text-sm bg-neutral-200 p-3 text-black text-right"
          >
            جستجوی محصول...
          </button>
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

          {/*   {debouncedSearch && (
          <SheetClose asChild>
            <SearchTermLink debouncedSearch={debouncedSearch} />
          </SheetClose>
        )} */}

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
    </React.Fragment>
  );
}
