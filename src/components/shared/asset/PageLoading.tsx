"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import React from "react";

export default function PageLoading() {
  const isMobile = useIsMobile();

  return isMobile === null ? (
    <div className="fixed z-[9999] bg-white right-0 top-0 w-screen h-screen">
      <div className="w-full  h-full flex items-center justify-center">
        <div className="w-fit shimmer-image">
          <Image
            priority
            alt=""
            width={200}
            height={200}
            src={"/rshop_logo_h.png"}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
    </div>
  ) : null;
}
