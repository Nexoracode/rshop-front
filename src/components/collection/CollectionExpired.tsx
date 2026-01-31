"use client";
import React from "react";
import { useCollectionExpiry } from "./useCollectionExpiry";

type Props = { end_date: string };

export default function CollectionExpired({ end_date }: Props) {
  const expired = useCollectionExpiry(end_date);

  if (expired)
    <div className="mt-3 rounded bg-destructive/20 px-4 py-2 text-sm">
      خرید از این کمپین متوقف شده
    </div>;

  return null;
}
