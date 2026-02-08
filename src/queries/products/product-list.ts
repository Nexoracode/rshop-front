import { apiFetch } from "@/lib/api-fetch";
import { PaginateData, ProductFilters } from "@/types";
import { Product, SortItem } from "@/types/product";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const getProductsByCategorySlug = (slug: string, query?: string) =>
  queryOptions({
    queryKey: ["get-products-by-category-slug", slug, query],
    queryFn: (): Promise<
      PaginateData<Product> & {
        filters: ProductFilters;
      }
    > => {
      return apiFetch(`/catalog/${slug}?${query}`);
    },
    enabled: !!slug,
  });

export const getProductsListInfinit = ({
  page = "1",
  query,
  slug,
  sortBy = "newest",
  type,
}: {
  slug?: string;
  query?: string;
  sortBy?: SortItem;
  page?: string;
  type: "all" | "category" | "brand";
}) =>
  infiniteQueryOptions<
    PaginateData<Product> & {
      filters: ProductFilters;
    }
  >({
    queryKey: ["get-products-list-infinite", slug, query, sortBy, type, page],
    queryFn: ({ pageParam = 1 }) => {
      const url = type === "brand" ? `/brand/${slug}` : `/${slug}`;

      const queryParams = new URLSearchParams();
      if (query) queryParams.append("query", query);
      if (sortBy) queryParams.append("sortBy", sortBy);
      if (pageParam) queryParams.append("page", pageParam.toString());
      if (page || pageParam) queryParams.append("page", page ?? pageParam);
      const queryStr = queryParams.toString();
      return apiFetch(`/catalog${url}?${queryStr}`);
    },
    getNextPageParam: ({ meta }) =>
      meta.current_page === meta.total_pages ? null : meta.current_page + 1,
    initialPageParam: 1,
  });
