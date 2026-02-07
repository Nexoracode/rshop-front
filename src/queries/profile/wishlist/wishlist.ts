import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { WishlistItem } from "@/types/product";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";

const queryClient = getQueryClient();
export const addWishlistList = mutationOptions({
  mutationFn: async ({ productId }: { productId: number }) =>
    await apiFetch("/profile/wishlist", {
      method: "POST",
      body: { productId },
    }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-wishlist-list"],
    });
  },
});
export const getWishlistList = queryOptions({
  queryKey: ["get-user-wishlist-list"],
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  queryFn: async (): Promise<Array<WishlistItem>> => {
    return await apiFetch("/profile/wishlist", { showErrorToast: false });
  },
  retry: false,
});

export const deleteFromWishlist = mutationOptions({
  mutationFn: async ({ itemId }: { itemId: number }) =>
    await apiFetch(`/profile/wishlist/${itemId}`, { method: "DELETE" }),

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-wishlist-list"],
    });
  },
});
