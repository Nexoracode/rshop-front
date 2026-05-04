"use client";
import { Input } from "@/components/ui/input";
import { Search, XIcon } from "lucide-react";
import React from "react";

type Props = {
  search: string;
  setSearch: (term: string) => void;
  debouncedSearch: string;
};

const SearchInput = React.forwardRef<HTMLDivElement, Props>(
  function SearchInputWithRef({ search, setSearch, debouncedSearch }, ref) {
    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-between gap-8 w-full px-5 bg-[rgb(242,243,245)] rounded-full h-[44px] border border-transparent ${search.length ? "bg-white !border-slate-200" : ""}`}
      >
        <div className="w-full flex items-center gap-1">
          <Search className="size-5.5 text-slate-500" />
          <Input
            dir="rtl"
            placeholder="جستجو"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onBlur={(e) => !!debouncedSearch && e.target.focus()}
            className={`bg-transparent border-none shadow-none w-full focus:bg-transparent focus:!border-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-500 placeholder:text-[13px]`}
          />
        </div>
        {search.length ? (
          <button
            onClick={() => setSearch("")}
            className="text-gray-500"
          >
            <XIcon strokeWidth={3} size={16} />
          </button>
        ) : null}
      </div>
    );
  },
);

export default SearchInput;
