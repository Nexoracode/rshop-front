"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { Collection } from "@/types/product";
import CollectionCountdown from "./CollectionCountdown";
import { useCollectionExpiry } from "./useCollectionExpiry";

export default function CollectionHero({
  collection,
}: {
  collection: Collection;
}) {
  const expired = useCollectionExpiry(collection.end_date);

  return (
    <div className="relative overflow-hidden rounded-2xl border">
      <Image
        src={collection.image}
        alt={collection.title}
        width={1200}
        height={200}
        className="h-[200px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <Badge className="mb-2 w-fit">کالکشن ویژه</Badge>
        <h1 className="text-2xl font-bold">{collection.title}</h1>
        <p className="text-sm opacity-90">{collection.description}</p>

        <div className="mt-4">
          <CollectionCountdown endDate={collection.end_date} />
        </div>

        {expired && (
          <div className="mt-3 rounded bg-destructive/20 px-4 py-2 text-sm">
            خرید از این کمپین متوقف شده
          </div>
        )}
      </div>
    </div>
  );
}
