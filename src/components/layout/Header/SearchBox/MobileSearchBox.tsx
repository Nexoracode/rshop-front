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
          <div onClick={() => setOpen(true)} className="relative mx-2">
            <Input
              dir="rtl"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={() => {}}
              className={`rounded-sm h-[44px] ${search.length ? "bg-white !border !border-slate-200" : "bg-[rgb(240,241,241)] border-none"} py-5 focus-visible:ring-0 text-gray-700`}
            />
            <button className="absolute text-muted px-4 top-0 bottom-0 -left-1 rounded-l-sm rounded-r-0">
              <Search className="size-5" />
            </button>
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
