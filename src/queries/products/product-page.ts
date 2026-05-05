import { getQueryClient } from "@/lib/utils/query-client";
import { ProductVariant } from "@/types/product";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";

const queryClient = getQueryClient();

type ProductPage = {
  variant: ProductVariant | null;
  activeTab: string | null;
};
const getProductPage = (productId: number) =>
  queryOptions({
    queryKey: ["product-page", productId],
    queryFn: (): ProductPage =>
      queryClient.getQueryData(["product-page", productId]) || {
        activeTab: null,
        variant: null,
      },
    initialData: {
      activeTab: null,
      variant: null,
    },
  });

const setProductPage = (productId: number) =>
  mutationOptions({
    mutationFn: async (values: ProductPage) => {
      return queryClient.setQueryData(["product-page", productId], values);
    },
  });

export function useProductPage() {
  const { id = 0 } = useParams();

  const { data: pageData } = useQuery(getProductPage(Number(id)));

  const { mutate } = useMutation(setProductPage(Number(id)));

  const setPageData = (values: Partial<ProductPage>) => {
    mutate({ ...pageData, ...values });
  };

  return { pageData, setPageData };
}
