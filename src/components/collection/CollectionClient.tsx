"use client";
import { getCollection } from "@/queries/products";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCardSkeleton from "../common/Skeleton/ProductCardSkeleton";
import { notFound } from "next/navigation";
import CollectionHero from "./CollectionHero";
import CollectionGrid from "./CollectionGrid";

type Props = {
  slug: string;
};

export default function CollectionClient({ slug }: Props) {
  const { data, isFetching, isError } = useQuery(getCollection(slug));

  if (isFetching) return <ProductCardSkeleton count={8} />;

  if (isError || !data) notFound();
  return (
    <div className="space-y-10">
      <CollectionHero collection={data} />
      <CollectionGrid products={data.products} endDate={data.end_date} />
    </div>
  );
}
