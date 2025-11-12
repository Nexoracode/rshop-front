import { apiFetch } from "@/lib/api-fetch";
import { PaginateData, ProductFilters } from "@/types";
import { Brand, Category, Product, ProductSearchResult } from "@/types/product";
import { Review } from "@/types/user";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function serializeQuery(
  queryObj: Record<string, any>,
  prefix: string = ""
): string {
  const result: string[] = [];

  Object.keys(queryObj).forEach((key) => {
    const value = queryObj[key];
    const encodedKey = prefix
      ? `${prefix}[${encodeURIComponent(key)}]`
      : encodeURIComponent(key);

    if (value && typeof value === "object" && !Array.isArray(value)) {
      // اگر آبجکت است، رکورد را باز کنیم (مانند attributes)
      result.push(serializeQuery(value, encodedKey));
    } else if (Array.isArray(value)) {
      // اگر آرایه است، مقادیرش را در query درست کنیم
      result.push(`${encodedKey}=${value.map(encodeURIComponent).join(",")}`);
    } else {
      // داده‌های معمولی
      result.push(`${encodedKey}=${encodeURIComponent(value)}`);
    }
  });

  return result.join("&");
}

/* eslint-enable @typescript-eslint/no-explicit-any */

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
export const getProductById = (product_id: string) =>
  queryOptions({
    queryKey: ["get-product-by-id", product_id],
    queryFn: async (): Promise<Product> => {
      return await apiFetch(`/product/site/${product_id}`);
    },
  });
export const getProductReviews = (product_id: number) =>
  infiniteQueryOptions<
    PaginateData<Review, { averege_rating: number; count: number }>
  >({
    queryKey: ["get_reviews_by_product_id", product_id],
    queryFn: async ({ pageParam }) => {
      return await apiFetch(`/profile/reviews/products/${product_id}`, {
        params: { page: pageParam as string },
      });
    },
    getNextPageParam: ({ meta }) => meta.current_page + 1,
    enabled: Boolean(product_id),
    initialPageParam: 1,
  });
export const searchTerm = (term: string) =>
  queryOptions({
    queryKey: ["search-by-term", term],
    queryFn: async (): Promise<{
      term: string;
      products: Array<ProductSearchResult>;
      brands: Array<Brand>;
      categories: Array<Category>;
    }> => {
      return await apiFetch(`/catalog`, { params: { term } });
    },
    enabled: !!term,
  });
