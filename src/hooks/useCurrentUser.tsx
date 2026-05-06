"use client";
import { getMe, refreshTokenQuery } from "@/queries/auth/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { data: refreshToken } = useQuery(refreshTokenQuery);

  const { data, isLoading, isPending } = useQuery(getMe(!!refreshToken));

  return {
    user: data || null,
    isLoading,
    isPending,
  };
}
