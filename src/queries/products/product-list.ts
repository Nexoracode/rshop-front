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
    queryKey: ["get-products-list-infinite", slug, query, sortBy, type],
    queryFn: ({ pageParam = 1 }) => {
      const url = type === "category" ? `${slug}` : `brand/${slug}`;
      return apiFetch(
        `/catalog/${slug}?${query}&page=${page || pageParam}&sortBy=${sortBy}`,
      );
    },
    enabled: !!slug,
    getNextPageParam: ({ meta }) =>
      meta.current_page === meta.total_pages ? null : meta.current_page + 1,
    initialPageParam: 1,
  });
