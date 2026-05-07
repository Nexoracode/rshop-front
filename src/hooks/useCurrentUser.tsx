"use client";
import { getMe } from "@/queries/auth/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { data, isLoading, isPending } = useQuery(getMe);

  return {
    user: data || null,
    isLoading,
    isPending,
  };
}
