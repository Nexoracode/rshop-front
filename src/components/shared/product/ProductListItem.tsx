"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Product } from "@/types/product";
import { calcPrice } from "@/lib/utils/number";
import useProductPrice from "@/hooks/product/useProductPrice";
import PriceBox from "./PriceBox";
import { cn } from "@/lib/utils/classnames";

export default function ProductListItem(props: Product) {
  const {
    name,
    price,
    discount_amount,
    discount_percent,
    media_pinned,
    medias,
    brand,
    variants,
    stock,
    has_variants,
  } = props;

  const { compareAt, final, percent } = useProductPrice({
    variants,
    discount_amount,
    discount_percent,
    has_variants,
    price,
    stock,
  });

  return (
    <Card
      className="group rounded-sm flex flex-row relative overflow-hidden border bg-transparent"
      dir="rtl"
    >
      {/* top right: discount */}
      {compareAt && (
        <Badge variant="danger" className="absolute left-2 top-2 z-10 ">
          {percent}%
        </Badge>
      )}

      {/* image */}
      <div className="relative w-24 rounded-xl aspect-[1/1] overflow-hidden">
        <Image
          src={media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className={cn(
            "object-cover opacity-100 ",
            medias.length > 1 &&
              "group-hover:opacity-0 transition-opacity duration-700",
          )}
        />
        {medias?.[1] && (
          <Image
            src={medias[1]?.url || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
      </div>

      {/* content */}
      <div className="mt-2 flex-1 flex flex-col justify-between px-1 pb-2">
        {brand ? <p className="text-xs text-gray-500">{brand.name}</p> : null}
        <h3 className="line-clamp-1 text-base font-semibold text-gray-800">
          {name}
        </h3>

        {/* price */}
        <div className="flex items-center gap-2">
          <PriceBox
            price={final}
            className="text-sm font-semibold text-primary-600"
          />

          {compareAt && (
            <PriceBox
              price={compareAt}
              className="text-xs text-gray-400 line-through"
            />
          )}
        </div>
      </div>
    </Card>
  );
}
