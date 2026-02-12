import { apiFetch } from "@/lib/api-fetch";
import { Brand } from "@/types/product";
import { queryOptions } from "@tanstack/react-query";

export const getBrandBySlug = (slug: string) =>
  queryOptions({
    queryKey: ["get-category-by-slug", slug],
    queryFn: async (): Promise<Brand> => {
      return apiFetch(`/brand/find/${slug}`);
    },
  });
