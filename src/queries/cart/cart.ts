import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { UserCart } from "@/types/cart";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const getCart = queryOptions({
  queryKey: ["get-cart"],
  queryFn: async (): Promise<UserCart> => {
    return await apiFetch("/cards/me");
  },
  retry: false,
});

export const addCartItem = mutationOptions({
  mutationFn: async (body: {
    productId: number;
    variantId: number | null;
    quantity: number;
  }) => {
    return await apiFetch("/cards/add", {
      method: "POST",
      body,
      showErrorToast: false,
    });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-cart"] });
  },
});

export const updateCartItem = mutationOptions({
  mutationFn: async (body: { itemId: number; quantity: number }) => {
    const response = await apiFetch("/cards/update", { method: "PATCH", body });
    return response;
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-cart"] });
  },
});

export const deleteCartItem = mutationOptions({
  mutationFn: async (body: { itemId: number }) => {
    return await apiFetch("/cards/remove", { method: "PATCH", body });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-cart"] });
  },
});
export const clearCart = mutationOptions({
  mutationFn: async () => {
    return await apiFetch("/cards/remove", { method: "delete" });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-cart"] });
  },
});
