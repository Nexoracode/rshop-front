"use client";
import { getCategoryBySlug } from "@/queries/products/category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function HeaderCategoryPageTitle() {
  const { slug = [""] } = useParams();

  const categorySlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const { data } = useQuery(getCategoryBySlug(categorySlug));

  return (
    <div className="flex-1 text-sm font-medium">
      <p>{data?.category.title}</p>
    </div>
  );
}
