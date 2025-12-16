import { apiFetch } from "@/lib/api-fetch";
import { HomeSectionsData } from "@/types/home";
import { queryOptions } from "@tanstack/react-query";

export const getHomeSections = queryOptions({
  queryKey: ["get-home-sections"],
  queryFn: async (): Promise<HomeSectionsData> => {
    return await apiFetch("/home");
  },
});
