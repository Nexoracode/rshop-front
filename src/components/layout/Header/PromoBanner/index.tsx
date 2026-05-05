"use client";

import { getPromoBanners } from "@/queries/home/home";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import CustomBanner from "./CustomBanner";
import { Skeleton } from "@/components/ui/skeleton";

export default function PromoBanner() {
  const { data: data, isFetching } = useQuery(getPromoBanners);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = useMemo(
    () =>
      data
        ? [...data]
            .filter((b) => b.is_active)
            .sort((a, b) => b.priority - a.priority)
        : [],
    [data],
  );

  useEffect(() => {
    if (banners.length === 0) return;

    const duration = banners[currentIndex]?.display_duration || 5;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, banners]);

  if (isFetching) {
    return null;
  }

  if (banners.length === 0) return null;

  return (
    <div className="w-full relative  object-center h-[40px] md:h-[60px] overflow-hidden">
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={banner.id}
            className={`absolute w-full inset-0 transition-all duration-500 ease-out
              ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            {banner.image_url ? (
              <Link href={banner.link ?? "/"} className="absolute inset-0">
                <Image
                  priority
                  src={banner.image_url}
                  fill
                  alt={banner.title}
                  className="object-cover object-center"
                />
              </Link>
            ) : (
              <CustomBanner banner={banner} isActive={isActive} />
            )}
          </div>
        );
      })}
    </div>
  );
}
