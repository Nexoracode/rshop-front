import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { WishlistItem } from "@/types/product";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

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
export const getWishlistList = (enabled: boolean) =>
  queryOptions({
    queryKey: ["get-user-wishlist-list"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Array<WishlistItem>> => {
      return await apiFetch("/profile/wishlist", { showErrorToast: false });
    },
    retry: false,
    enabled,
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
