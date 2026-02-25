"use client";
import { LucideSearch } from "lucide-react";

import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchTerm } from "@/queries/products/search";
import { cn } from "@/lib/utils/classnames";
import SearchSheet from "./SearchSheet";

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
          <button
            onClick={() => setOpen(true)}
            className="rounded-md relative !w-full block text-sm bg-neutral-200 p-3 text-black text-right"
          >
            جستجوی محصول...
            <LucideSearch className="text-primary absolute left-3 top-[50%] -translate-y-[50%]" />
          </button>
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
