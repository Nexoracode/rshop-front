import { apiFetch } from "@/lib/api-fetch";
import {
  Faq,
  FaqCategory,
  HomeSectionsData,
  InfoPageData,
  PromoBanner,
  PublicSettings,
} from "@/types/home";
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
    return await apiFetch("/home/promo-banner");
  },
});

export const getFooterSettings = queryOptions({
  queryKey: ["get-footer-settings"],
  queryFn: async (): Promise<{
    contact: Array<PublicSettings>;
    social: Array<PublicSettings>;
  }> => {
    return await apiFetch("/settings/footer");
  },
});

export const getPageData = (slug: string) =>
  queryOptions({
    queryKey: ["get-shop-info", slug],
    queryFn: async (): Promise<InfoPageData> => {
      return await apiFetch(`/store-info/${slug}`);
    },
  });

export const getStoreFaqs = queryOptions({
  queryKey: ["get-store-faqs"],
  queryFn: async (): Promise<{
    faq_categories: Array<FaqCategory>;
    faqs: Array<Faq>;
  }> => {
    return await apiFetch("/store-info/faqs");
  },
});
