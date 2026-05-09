import useCurrentUser from "@/hooks/useCurrentUser";
import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { City, Province } from "@/types";
import { UserAddress } from "@/types/user";
import { mutationOptions, queryOptions, useQuery } from "@tanstack/react-query";

const queryClient = getQueryClient();
export const getProvinces = queryOptions({
  queryKey: ["get-provices"],
  queryFn: async (): Promise<Array<Province>> => {
    return await apiFetch("/location/provinces");
  },
});
export const getCities = (province_id: number) =>
  queryOptions({
    queryKey: ["get-cities", province_id],
    queryFn: async (): Promise<Array<City>> => {
      return await apiFetch(`/location/city/${province_id}`);
    },
    enabled: !!province_id,
  });

export const addUserAddress = mutationOptions({
  mutationFn: async (body: Omit<UserAddress, "id">): Promise<UserAddress> =>
    await apiFetch("/users/me/addresses", { method: "POST", body }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-user-addresses"] });
  },
});

export const getUserAddress = (enabled: boolean) =>
  queryOptions({
    queryKey: ["get-user-addresses"],
    queryFn: async (): Promise<Array<UserAddress>> => {
      return await apiFetch("/users/me/addresses");
    },
    enabled,
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

export function useAddresses() {
  const { isPending } = useCurrentUser();
  return useQuery(getUserAddress(!isPending));
}
