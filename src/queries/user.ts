import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/types/user";
import {
  mutationOptions,
  queryOptions,
  useMutation,
} from "@tanstack/react-query";
import { useEffect } from "react";

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

export const getMe = queryOptions({
  queryKey: ["get-me"],
  queryFn: async (): Promise<User | null> => {
    return await apiFetch("/users/me");
  },
  retry: false,
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

export const editProfile = mutationOptions({
  mutationFn: async ({ id, ...body }: Partial<User>) => {
    apiFetch(`/users/${id}`, { body, method: "PATCH" });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["get-me"] });
  },
});
export const useRequestOtp = ({
  handleSuccess,
}: {
  handleSuccess: (variables: { identifier: string }) => void;
}) => {
  const { mutate, isPending, variables, isSuccess } = useMutation(requestOtp);

  const handleSendOtp = ({ phone }: { phone: string }) => {
    mutate({ identifier: phone });
  };

  useEffect(() => {
    if (isSuccess) handleSuccess(variables);
  }, [isSuccess, handleSuccess, variables]);

  return {
    handleSendOtp,
    isPending,
    isSuccess,
    variables,
  };
};
