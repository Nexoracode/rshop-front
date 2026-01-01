"use client";
import usePromotionPadding from "@/hooks/usePromotionPadding";

import React from "react";

export default function BannerPadding() {
  const { bannerExists } = usePromotionPadding();
  return <div className={bannerExists ? "py-10" : ""}></div>;
}
