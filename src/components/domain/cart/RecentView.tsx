"use client";
import { recentViewList } from "@/queries/profile/recent_views";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import SectionTitle from "@/components/common/SectionTitle";
import ProductCartItem from "../home/ProductCartItem";
import ProductCarousel from "@/components/common/ProductCarousel";

export default function RecentView() {
  const { data } = useQuery(recentViewList);

  const products: any = data?.map((p) => p.product);

  if (!products?.length) return null;

  return (
    <div className="md:border rounded-lg relative overflow-hidden">
      <div className="p-2 md:p-6">
        <SectionTitle title={"بازدیدهای اخیر شما"} />
      </div>
      <ProductCarousel items={products} renderItem={ProductCartItem} />
    </div>
  );
}
