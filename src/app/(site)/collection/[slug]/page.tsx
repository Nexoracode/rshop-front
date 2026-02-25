import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import CollectionGrid from "@/components/domain/collection/CollectionGrid";
import CollectionHero from "@/components/domain/collection/CollectionHero";
import { getQueryClient } from "@/lib/utils/query-client";
import { getCollectionDetails } from "@/queries/products/collection";
import React, { Suspense } from "react";

export default async function CollectionPage({
  params,
}: PageProps<"/collection/[slug]">) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getCollectionDetails(slug));

  if (!data) return <p>کالکشن یافت نشد</p>;

  return (
    <div className="container space-y-1  py-10">
      <div className="space-y-10">
        <CollectionHero data={data} />

        <Suspense fallback={<ProductCardSkeleton />}>
          <CollectionGrid slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}
