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
import { SearchResultsPanel } from "./SearchResultsPanel";

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
          <SearchResultsPanel
            debouncedSearch={debouncedSearch}
            isPending={isPending}
            products={data?.products ?? []}
            categories={data?.categories ?? []}
            brands={data?.brands ?? []}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
