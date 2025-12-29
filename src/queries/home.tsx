import { apiFetch } from "@/lib/api-fetch";
import { HomeSectionsData, PromoBanner } from "@/types/home";
import { queryOptions } from "@tanstack/react-query";

export const getHomeSections = queryOptions({
  queryKey: ["get-home-sections"],
  queryFn: async (): Promise<HomeSectionsData> => {
    return await apiFetch("/home");
  },
});

export const getPromoBanners = queryOptions({
  queryKey: ["get-promo-banners"],
  queryFn: async (): Promise<Array<PromoBanner>> => {
    return await apiFetch("/home/promo-banners");
  },
});
