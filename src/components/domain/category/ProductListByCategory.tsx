"use client";
import {
  getProductsByCategorySlug,
  getProductsInfinit,
} from "@/queries/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  categorySlug: string;
};

export default function ProductListByCategory({ categorySlug }: Props) {
  const { data } = useInfiniteQuery(
    getProductsInfinit(categorySlug, "", "", ""),
  );
  return <div>ProductListByCategory</div>;
}
