"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useMounted } from "@/hooks/useMounted";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils/classnames";
import { getPromoBanners } from "@/queries/home/home";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

type Props = {};

export default function ProductsTabsWrapper({ children }: PropsWithChildren) {
  const mounted = useMounted();
  const { data: adsBanners } = useQuery(getPromoBanners);

  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();
  const haveAdsBanner = adsBanners && adsBanners?.length > 0;

  if (!mounted) return null;
  return (
    <div
      className={cn(
        "sticky z-30 bg-background border-b rtl",
        scrollDirection === "down"
          ? haveAdsBanner
            ? isMobile
              ? "top-[6rem]"
              : "top-[8rem]"
            : isMobile
              ? "top-[3.5rem]"
              : "top-[4rem]"
          : haveAdsBanner
            ? isMobile
              ? "top-[6rem]"
              : "top-[10.5rem]"
            : isMobile
              ? "top-[56px]"
              : "top-[108px]",
      )}
    >
      {children}
    </div>
  );
}
