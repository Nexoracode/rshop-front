"use client";
import {
  deleteFromCompareList,
  getCompareList,
} from "@/queries/profile/compare/compare";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCompare from "./ProductCompare";
import PageLoader from "@/components/common/PageLoader";

export default function ProductComparePage() {
  const { data: compareList, isLoading } = useQuery(getCompareList);
  const { mutate } = useMutation(deleteFromCompareList);
  return isLoading ? (
    <PageLoader />
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
