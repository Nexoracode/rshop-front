import { apiFetch } from "@/lib/api-fetch";
import { getCookie } from "@/lib/utils/get-cookies";
import { getQueryClient } from "@/lib/utils/query-client";
import { User } from "@/types/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();
export const requestOtp = mutationOptions({
  mutationFn: (body: { identifier: string }) => {
    return apiFetch(`/auth/request-otp`, { method: "post", body });
  },
});
export const verifyOtp = mutationOptions({
  mutationFn: (body: { identifier: string; code: string }) => {
    return apiFetch(`/auth/verify-otp`, {
      method: "post",
      body,
    });
  },

  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-me"] });
  },
});

export const getMe = (hasRefreshToken: boolean) =>
  queryOptions({
    queryKey: ["get-me"],
    queryFn: async (): Promise<User | null> => {
      return await apiFetch("/users/me");
    },
    retry: false,
    enabled: hasRefreshToken,
  });

export const userLogout = mutationOptions({
  mutationFn: async () => {
    return await apiFetch(`/auth/logout`, {
      method: "POST",
    });
  },

  onSuccess: () => {
    queryClient.setQueryData(["get-me"], null);
    queryClient.setQueryData(["get-cart"], null);
    queryClient.setQueryData(["get-user-compare-list"], null);
  },
});

export const refreshTokenQuery = queryOptions({
  queryKey: ["refresh_token"],
  queryFn: async () => (await getCookie("refresh_token")) ?? null,
});
