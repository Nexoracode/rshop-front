import { apiFetch } from "@/lib/api-fetch";
import { PaginateData, ProductFilters } from "@/types";
import { Brand, Category, Product, ProductSearchResult } from "@/types/product";
import { SeoInfo } from "@/types/seo";
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
export const getProductsInfinit = (
  slug: string,
  query: string,
  sortBy: string,
  page: string
) =>
  infiniteQueryOptions<
    PaginateData<Product> & {
      filters: ProductFilters;
    }
  >({
    queryKey: ["get-products-by-category-slug", slug, query, sortBy],
    queryFn: ({ pageParam = 1 }) => {
      return apiFetch(
        `/catalog/${slug}?${query}&page=${page || pageParam}&sortBy=${sortBy}`
      );
    },
    enabled: !!slug,
    getNextPageParam: ({ meta }) =>
      meta.current_page === meta.total_pages ? null : meta.current_page + 1,
    initialPageParam: 1,
  });
export const getCategorySeoDataBySlug = (slug: string) =>
  queryOptions({
    queryKey: ["get-category-seodata-by-slug", slug],
    queryFn: async (): Promise<SeoInfo> => {
      return apiFetch(`/category/site/seo/${slug}`);
    },
  });
export const getCategoryBySlug = (slug: string) =>
  queryOptions({
    queryKey: ["get-category-by-slug", slug],
    queryFn: async (): Promise<{
      category: Category;
      parents: Array<Category>;
    }> => {
      return apiFetch(`/category/site/with-parents/slug/${slug}`);
    },
  });
export const getProductById = (product_id: string) =>
  queryOptions({
    queryKey: ["get-product-by-id", product_id],
    queryFn: async (): Promise<{ product: Product; seo: SeoInfo }> => {
      return await apiFetch(`/product/site/${product_id}`);
    },
  });
export const getProductReviews = (product_id: number, page: number | null) =>
  infiniteQueryOptions<
    PaginateData<Review, { averege_rating: number; count: number }>
  >({
    queryKey: ["get_reviews_by_product_id", product_id, page],
    queryFn: async ({ pageParam }) => {
      return await apiFetch(`/profile/reviews/products/${product_id}`, {
        params: { page: page || (pageParam as string), limit: 2 },
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
