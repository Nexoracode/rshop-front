"use client";
import {
  deleteFromCompareList,
  getCompareList,
} from "@/queries/profile/compare/compare";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCompare from "./ProductCompare";
import PageLoading from "@/components/shared/asset/PageLoading";

export default function ProductComparePage() {
  const { data: compareList, isLoading } = useQuery(getCompareList);
  const { mutate } = useMutation(deleteFromCompareList);
  return isLoading ? (
    <PageLoading />
  ) : (
    <div className="container mx-auto">
      <ProductCompare
        items={compareList ?? []}
        onAddProduct={() => {}}
        onRemove={(id) => mutate({ productId: id })}
      />
    </div>
  );
}
