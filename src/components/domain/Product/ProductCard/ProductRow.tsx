"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AddToCompareBtn from "./AddToCompareBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Product } from "@/types/product";
import { calcPrice } from "@/lib/utils/number";
import { formatToman } from "@/lib/utils/price";
import { cn } from "@/lib/utils/classnames";

export default function ProductRow(props: Product) {
  const {
    name,
    price,
    discount_amount,
    discount_percent,
    media_pinned,
    medias,
    brand,
  } = props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Card
      className="group rounded-sm flex flex-row relative overflow-hidden border bg-transparent"
      dir="rtl"
    >
      {/* top left: wishlist */}
      <div className="absolute z-20  gap-y-0.5 flex flex-col right-1 top-1">
        <div className="flex translate-x-12 group-hover:translate-x-0 transition-transform ease-in-out duration-700 flex-col gap-y-0.5">
          <AddToWishlistBtn id={props.id} />
          <AddToCompareBtn productId={props.id} />
        </div>
      </div>

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
        {/* rating */}
        {/* <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) =>
            i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div> */}

        {/* price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary-600">
            {formatToman(final)}{" "}
          </span>
          {compareAt && (
            <span className="text-xs text-gray-400 line-through">
              {formatToman(+compareAt)}
            </span>
          )}
        </div>
      </div>

      {/* hover actions */}
    </Card>
  );
}
