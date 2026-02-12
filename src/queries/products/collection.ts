import { apiFetch } from "@/lib/api-fetch";
import { Collection, CollectionProduct } from "@/types/product";
import { queryOptions } from "@tanstack/react-query";

export const getCollectionDetails = (slug: string) =>
  queryOptions({
    queryKey: ["get-collection-details", slug],
    queryFn: async (): Promise<Collection> => {
      return await apiFetch(`/home/collection/${slug}?slug=${slug}`);
    },
    enabled: !!slug,
  });
export const getCollectionProducts = (slug: string) =>
  queryOptions({
    queryKey: ["get-collection-products", slug],
    queryFn: async (): Promise<{ products: Array<CollectionProduct> }> => {
      return await apiFetch(`/home/collection/${slug}/products?slug=${slug}`);
    },
    enabled: !!slug,
  });
