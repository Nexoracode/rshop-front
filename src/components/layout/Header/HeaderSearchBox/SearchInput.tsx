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
      <div ref={ref} className="relative  w-full">
        <Input
          dir="rtl"
          placeholder="جستجوی محصول..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onBlur={(e) => !!debouncedSearch && e.target.focus()}
          className="rounded-sm bg-background text-black pe-10"
        />
        <button className="absolute  text-primary px-4  top-0 bottom-0 -left-1 rounded-l-sm rounded-r-0">
          <Search />
        </button>
        {debouncedSearch ? (
          <button
            onClick={() => setSearch("")}
            className="absolute  text-danger-500 px-5  top-0 bottom-0 left-5"
          >
            <XIcon strokeWidth={3} size={18} />
          </button>
        ) : null}
      </div>
    );
  }
);

export default SearchInput;
