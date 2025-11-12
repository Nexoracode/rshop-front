"use client";

import { useEffect, useState } from "react";

export function useDebounceSearch(initialValue = "", delay = 500) {
  const [search, setSearch] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);

  return { search, setSearch, debouncedSearch, setDebouncedSearch };
}
