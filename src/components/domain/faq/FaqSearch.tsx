"use client";
import { Input } from "@/components/ui/input";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import React, { useEffect } from "react";

type Props = {
  onSearch: (search: string) => void;
  clearSearch?: () => void;
};

export default function FaqSearch({ onSearch, clearSearch }: Props) {
  const { debouncedSearch, setSearch, search } = useDebounceSearch();
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      clearSearch?.();
      return;
    }
    onSearch(debouncedSearch);
  }, [debouncedSearch, clearSearch, onSearch]);
  return (
    <div className="max-w-xl mx-auto">
      <Input
        className="p-5"
        placeholder="جستجوی موضوع"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
