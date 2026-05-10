import { PromoBanner } from "@/types/home";
import Link from "@/components/shared/Link";
import React from "react";

type Props = {
  banner: PromoBanner;
  isActive: boolean;
};

export default function CustomBanner({ banner, isActive }: Props) {
  return (
    <div
      style={{
        backgroundColor: banner.background_color,
        color: banner.text_color,
      }}
      className="w-full h-full flex items-center justify-between px-4 gap-4"
    >
      <div className="container flex justify-between items-center">
        {/* متن */}
        <div className="flex flex-col md:flex-row justify-center flex-1 leading-tight overflow-hidden">
          {/* عنوان */}
          <span
            className={`
          text-lg md:text-2xl font-bold animate-soft-loop 
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
            text-xs  opacity-80 pb-1
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
  );
}
