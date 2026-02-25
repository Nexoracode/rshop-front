"use client";
import usePromotionPadding from "@/hooks/usePromotionPadding";

import React from "react";

export default function PromoBannerPadding() {
  const { bannerExists } = usePromotionPadding();
  return (
    <div className={bannerExists ? "py-[1.125rem] md:py-[2rem]" : ""}></div>
  );
}
