import { apiFetch } from "@/lib/api-fetch";
import { Product } from "@/types/product";
import { SeoInfo } from "@/types/seo";
import { queryOptions } from "@tanstack/react-query";

export const getProductById = (product_id: string) =>
  queryOptions({
    queryKey: ["get-product-by-id", product_id],
    queryFn: async (): Promise<{ product: Product; seo: SeoInfo }> => {
      return await apiFetch(`/product/site/${product_id}`);
    },
  });

export const getSimilarProducts = (productId: number) =>
  queryOptions({
    queryKey: ["get-similar-products", productId],
    queryFn: async (): Promise<Array<Product>> => {
      return await apiFetch(`/product/${productId}/similar`);
    },
    enabled: !!productId,
  });

export const fetchProductById = async (
  product_id: string,
): Promise<{ product: Product; seo: SeoInfo }> =>
  await apiFetch(`/product/site/${product_id}`);

export const fetchProductsIds = async (): Promise<Array<number>> => {
  return await apiFetch(`/product/ids`);
};
