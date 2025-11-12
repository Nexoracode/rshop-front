import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { CompareListItem } from "@/types/product";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const queryClient = getQueryClient();
export const addToCompareList = mutationOptions({
  mutationFn: async ({ productId }: { productId: number }) =>
    await apiFetch("/profile/compare", { method: "POST", body: { productId } }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-compare-list"],
    });
  },
});
export const getCompareList = queryOptions({
  queryKey: ["get-user-compare-list"],
  queryFn: async (): Promise<Array<CompareListItem>> => {
    return await apiFetch("/profile/compare", { showErrorToast: false });
  },
  retry: false,
});

export const deleteFromCompareList = mutationOptions({
  mutationFn: async ({ productId }: { productId: number }) =>
    await apiFetch(`/profile/compare/${productId}`, { method: "DELETE" }),

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-compare-list"],
    });
  },
});

export const useCompareList = ({ productId }: { productId: number }) => {
  const { data } = useQuery(getCompareList);
  const {
    mutateAsync: addItem,
    isSuccess,
    isPending,
  } = useMutation(addToCompareList);
  const inCompareList = data?.find((i) => i.product.id === productId);
  const {
    mutate: deleteItem,
    isSuccess: deleteSuccess,
    isPending: deletePending,
  } = useMutation(deleteFromCompareList);

  const addToCampare = async (action: () => void) => {
    await addItem({ productId }).then(() => action?.());
  };
  const deleteFromCompare = () => {
    deleteItem({ productId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("محصول به لیست مقایسه اظافه شد");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("محصول از لیست مقایسه حذف شد");
    }
  }, [deleteSuccess]);

  return {
    inCompareList,
    addToCampare,
    deleteFromCompare,
    disable: isPending || deletePending,
  };
};
