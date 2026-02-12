import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { UserAddress } from "@/types/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();
export const addUserAddress = mutationOptions({
  mutationFn: async (body: Omit<UserAddress, "id">) =>
    await apiFetch("/users/me/addresses", { method: "POST", body }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-user-addresses"] });
  },
});
export const getUserAddress = queryOptions({
  queryKey: ["get-user-addresses"],
  queryFn: async (): Promise<Array<UserAddress>> => {
    return await apiFetch("/users/me/addresses");
  },
});

export const updateUserAddress = mutationOptions({
  mutationFn: async ({ id, ...body }: UserAddress) =>
    await apiFetch(`/users/me/addresses/${id}`, { method: "PATCH", body }),

  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-user-addresses"] });
  },
});
export const deleteUserAddress = mutationOptions({
  mutationFn: async ({ addressId }: { addressId: number }) =>
    await apiFetch(`/users/me/addresses/${addressId}`, { method: "DELETE" }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-user-addresses"] });
  },
});
