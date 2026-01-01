import CollectionClient from "@/components/collection/CollectionClient";
import React from "react";

export default async function CollectionPage({
  params,
}: PageProps<"/collection/[slug]">) {
  const { slug } = await params;
  return (
    <div className="container space-y-1  py-10">
      <CollectionClient slug={slug} />
    </div>
  );
}
