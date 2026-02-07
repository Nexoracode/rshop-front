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
  staleTime: Infinity,
  refetchOnWindowFocus: false,
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
