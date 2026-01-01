"use client";

import { getPromoBanners } from "@/queries/home";
import { useQuery } from "@tanstack/react-query";

export default function usePromotionPadding() {
  const { data, isPending } = useQuery(getPromoBanners);

  const bannerExists = isPending || (data ?? []).length > 0;
  return { bannerExists };
}
