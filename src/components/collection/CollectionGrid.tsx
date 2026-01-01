"use client";

import ExpiredCTA from "./ExpiredCTA";
import { CollectionProduct } from "@/types/product";
import { useCollectionExpiry } from "./useCollectionExpiry";
import CollectionProductCart from "./CollectionProductCard";

export default function CollectionGrid({
  products,
  endDate,
}: {
  products: CollectionProduct[];
  endDate: string;
}) {
  const expired = useCollectionExpiry(endDate);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((p) => (
          <CollectionProductCart key={p.id} {...p} />
        ))}
      </div>

      {expired && <ExpiredCTA />}
    </>
  );
}
