import React from "react";
import SearchPrompt from "./SearchPrompt";
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
import { SearchResultsPanel } from "./SearchResultsPanel";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  data: SearchResult | undefined | null;
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
            <Button
              size={"icon"}
              variant={"text-nohover"}
              className="text-slate-500 ml-3"
            >
              <ArrowRight className="size-5.5" />
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

        {/* محتوای اصلی نتایج */}
        {!debouncedSearch ? (
          <SearchPrompt />
        ) : (
          <SearchResultsPanel
            debouncedSearch={debouncedSearch}
            isPending={isFetching}
            products={data?.products ?? []}
            categories={data?.categories ?? []}
            brands={data?.brands ?? []}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
