"use client";
import { getMe } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { data, isLoading } = useQuery({ ...getMe });

  return {
    user: data || null,
    isLoading,
  };
}
