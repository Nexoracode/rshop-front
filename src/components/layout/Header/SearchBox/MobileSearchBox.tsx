"use client";
import { LucideSearch, Search } from "lucide-react";

import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchTerm } from "@/queries/products/search";
import { cn } from "@/lib/utils/classnames";
import SearchSheet from "./SearchSheet";
import { Input } from "@/components/ui/input";

export default function MobileSearchBox({
  triggerMode = "button",
}: {
  triggerMode: "button" | "icon";
}) {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const { data, isFetching } = useQuery(searchTerm(debouncedSearch));
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setOpen(false);
    setSearch("");
  }, [pathName, setSearch, setOpen]);

  const onOpenChange = (op: boolean) => {
    if (!op) {
      setSearch("");
      setOpen(false);
    }
  };
  return (
    <React.Fragment>
      <div className="relative w-full">
        {triggerMode === "button" ? (
          <div onClick={() => setOpen(true)}>
            <div
              className={`relative flex items-center justify-between gap-8 w-full px-5 bg-[rgb(242,243,245)] rounded-full h-[44px] border border-transparent ${search.length ? "bg-white !border-slate-200" : ""}`}
            >
              <div className="w-full flex items-center justify-between gap-1">
                <Input
                  dir="rtl"
                  placeholder="جستجو"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onBlur={(e) => !!debouncedSearch && e.target.focus()}
                  className={`bg-transparent border-none shadow-none w-full focus:bg-transparent focus:!border-none ps-0 focus-visible:ring-0 text-gray-600 placeholder:text-gray-500 placeholder:text-[13px]`}
                />
                <Search className="size-5.5 text-slate-500" />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "text-primary absolute left-0  top-[50%] -translate-y-[50%]",
              "px-4 -left-1",
            )}
          >
            <LucideSearch />
          </button>
        )}
      </div>

      <SearchSheet
        search={search}
        setSearch={setSearch}
        debouncedSearch={debouncedSearch}
        data={data}
        isFetching={isFetching}
        onOpenChange={onOpenChange}
        open={open}
      />
    </React.Fragment>
  );
}
