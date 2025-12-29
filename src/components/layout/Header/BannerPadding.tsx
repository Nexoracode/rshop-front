"use client";
import { getPromoBanners } from "@/queries/home";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BannerPadding() {
  const { data, isPending } = useQuery(getPromoBanners);

  const className = isPending || (data ?? []).length > 0 ? "py-10" : "";
  return <div className={className}></div>;
}
