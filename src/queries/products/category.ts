import { apiFetch } from "@/lib/api-fetch";
import { Category } from "@/types/product";
import { SeoInfo } from "@/types/seo";
import { queryOptions } from "@tanstack/react-query";

export const getCategoreis = queryOptions({
  queryKey: ["get-categories"],
  queryFn: async (): Promise<Array<Category>> => {
    return await apiFetch("/category/site");
  },
});
export const getCategoryBySlug = (slug: string) =>
  queryOptions({
    queryKey: ["get-category-by-slug", slug],
    queryFn: async (): Promise<{
      category: Category;
      parents: Array<Category>;
    }> => {
      return await apiFetch(`/category/site/with-parents/slug/${slug}`);
    },
  });

export const getCategorySeoDataBySlug = (slug: string) =>
  queryOptions({
    queryKey: ["get-category-seodata-by-slug", slug],
    queryFn: async (): Promise<SeoInfo> => {
      return apiFetch(`/category/site/seo/${slug}`);
    },
  });

export const fetchCategoriesSlugs = async (): Promise<Array<string>> =>
  await apiFetch(`/category/slugs`);

export const fetchBrandsSlugs = async (): Promise<Array<string>> =>
  await apiFetch(`/brand/slugs`);

export const fetchCategoryBySlug = async (
  slug: string,
): Promise<{
  category: Category;
  parents: Array<Category>;
}> => await apiFetch(`/category/site/with-parents/slug/${slug}`);
