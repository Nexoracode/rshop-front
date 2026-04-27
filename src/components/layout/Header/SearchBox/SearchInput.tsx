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
      <div ref={ref} className="relative w-full">
        <Input
          dir="rtl"
          placeholder="جستجوی محصول..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onBlur={(e) => !!debouncedSearch && e.target.focus()}
          className={`rounded-md h-[48px] bg-[rgb(240,241,241)] ${search.length ? "bg-white !border !border-slate-200 rounded-lg shadow-[0_0_7px_lightgray]" : ""} border-none focus:bg-white focus:!border focus:!border-slate-200 focus:rounded-lg focus:shadow-[0_0_7px_lightgray] py-5 focus-visible:ring-0 text-gray-700 ps-11`}
        />
        <button className="absolute  text-muted px-4  top-0 bottom-0 -right-1 rounded-l-sm rounded-r-0">
          <Search className="size-5" />
        </button>
        {search.length ? (
          <button
            onClick={() => setSearch("")}
            className="absolute text-gray-600 pl-3 top-0 bottom-0 left-0"
          >
            <XIcon strokeWidth={3} size={18} />
          </button>
        ) : null}
      </div>
    );
  }
);

export default SearchInput;
