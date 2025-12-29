"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getPromoBanners } from "@/queries/home";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AdsBanner() {
  const { data, isFetching } = useQuery(getPromoBanners);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = data
    ? [...data]
        .filter((b) => b.is_active)
        .sort((a, b) => b.priority - a.priority)
    : [];

  useEffect(() => {
    if (banners.length === 0) return;

    const duration = banners[currentIndex]?.display_duration || 5;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, banners]);

  if (isFetching) {
    return (
      <div className="w-full relative h-[4rem]">
        <Skeleton className="h-full" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <div className="w-full relative h-[4rem] overflow-hidden">
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-500 ease-out
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
                  className="object-cover"
                />
              </Link>
            ) : (
              <div
                style={{
                  backgroundColor: banner.background_color,
                  color: banner.text_color,
                }}
                className="w-full h-full flex items-center justify-between px-4 gap-4"
              >
                <div className="container flex justify-between items-center">
                  {/* متن */}
                  <div className="flex justify-center flex-1 leading-tight overflow-hidden">
                    {/* عنوان */}
                    <span
                      className={`
          text-2xl font-bold animate-soft-loop 
          transition-all duration-500 ease-out
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
                    >
                      {banner.title}
                    </span>

                    {/* توضیح */}
                    {banner.description && (
                      <span
                        className={`
            text-xs opacity-80
            transition-all duration-500 ease-out delay-100
            ${isActive ? "opacity-80 translate-y-0" : "opacity-0 translate-y-2"}
          `}
                      >
                        {banner.description}
                      </span>
                    )}
                  </div>

                  {/* دکمه CTA */}
                  {banner.link_text && (
                    <Link
                      href={banner.link}
                      className={`
          shrink-0 text-xs font-medium px-3 py-1.5 rounded-md
          bg-white/90 text-black
          transition-all duration-300 ease-out delay-200
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          hover:bg-white hover:scale-105
        `}
                    >
                      {banner.link_text}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
