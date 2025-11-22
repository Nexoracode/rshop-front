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

export const useWishlist = ({
  id,
  action,
}: {
  id: number;
  action: React.ReactNode;
}) => {
  const { data } = useQuery(getWishlistList);
  const {
    mutate: addToWishlistItem,
    isPending,
    isSuccess,
  } = useMutation(addWishlistList);
  const {
    mutate: deleteFromWishlistMutate,
    isPending: dIsPending,
    isSuccess: dIsSuucess,
  } = useMutation(deleteFromWishlist);

  const inWishlist = data?.find((i) => i.product.id === id);
  const toggle = () => {
    if (!inWishlist) addToWishlistItem({ productId: id });
    else deleteFromWishlistMutate({ itemId: inWishlist.id });
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("محصول به لیست علاقه مندی ها اظافه شد", { action });
  }, [isSuccess, action]);
  useEffect(() => {
    if (dIsSuucess)
      toast.success("محصول از لیست علاقه مندی ها حذف شد", { action });
  }, [dIsSuucess, action]);

  return {
    inWishlist,
    toggle,
    disabled: isPending || dIsPending,
  };
};
