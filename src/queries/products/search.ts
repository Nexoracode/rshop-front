import { apiFetch } from "@/lib/api-fetch";
import { Brand, Category, ProductSearchResult } from "@/types/product";
import { queryOptions } from "@tanstack/react-query";

export const searchTerm = (term: string) =>
  queryOptions({
    queryKey: ["search-by-term", term],
    queryFn: async (): Promise<{
      term: string;
      products: Array<ProductSearchResult>;
      brands: Array<Brand>;
      categories: Array<Category>;
    }> => {
      return await apiFetch(`/catalog/search`, { params: { term } });
    },
    enabled: !!term,
  });
