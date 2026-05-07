import { apiFetch } from "@/lib/api-fetch";
import { SearchResult } from "@/types/product";
import { queryOptions } from "@tanstack/react-query";

export const searchTerm = (term: string) =>
  queryOptions({
    queryKey: ["search-by-term", term],
    queryFn: async (): Promise<SearchResult> => {
      return await apiFetch(`/catalog/search`, { params: { term } });
    },
  });
