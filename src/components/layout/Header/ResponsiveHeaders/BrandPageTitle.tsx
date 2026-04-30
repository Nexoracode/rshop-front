"use client";
import { getBrandBySlug } from "@/queries/products/brand";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function BrandPageTitle() {
  const { slug = [""] } = useParams();

  const brandSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const { data } = useQuery(getBrandBySlug(brandSlug));

  return (
    <div className="flex-1 text-sm font-medium w-full text-nowrap">
      <p>{data?.name}</p>
    </div>
  );
}
