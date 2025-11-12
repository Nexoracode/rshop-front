"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AddToCompareBtn from "./AddToCompareBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";
import { cn, formatToman } from "@/lib/utils";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Product } from "@/types/product";

export default function ProductCard(props: Product) {
  const {
    name,
    price,
    discount_amount,
    discount_percent,
    media_pinned,
    medias,
    id,
    brand,
  } = props;

  const discountPrice = discount_amount
    ? Number(price) - Number(discount_amount)
    : discount_percent
    ? ((100 - discount_percent) / 100) * Number(price)
    : null;

  const discountPercent = discount_percent
    ? discount_percent
    : discountPrice
    ? Math.round((Number(discountPrice) / Number(price)) * 100)
    : null;
  return (
    <Link href={`/p/rsp-${id}`}>
      <Card
        className="group relative overflow-hidden border !p-2 shadow-sm transition hover:shadow-md"
        dir="rtl"
      >
        {/* top left: wishlist */}
        <div className="absolute z-20  gap-y-0.5 flex flex-col right-1 top-1">
          <div className="flex translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out flex-col gap-y-0.5">
            <AddToWishlistBtn id={id} />

            <AddToCompareBtn productId={id} />
          </div>
        </div>

        {/* top right: discount */}
        {discountPercent && (
          <Badge variant="danger" className="absolute left-4 top-4 z-10 ">
            {discountPercent}%
          </Badge>
        )}

        {/* image */}
        <div className="relative rounded-xl aspect-[1/1] w-full overflow-hidden">
          <Image
            src={media_pinned?.url || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className={cn(
              "object-cover opacity-100 ",
              medias.length > 1 &&
                "group-hover:opacity-0 transition-opacity duration-700"
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
        <div className="mt-2 space-y-1 px-1 pb-2">
          {brand ? <p className="text-xs text-gray-500">{brand.name}</p> : null}
          <h3 className="line-clamp-1 text-sm font-medium text-gray-800">
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
            <span className="text-base font-bold text-primary-600">
              {discountPrice ? formatToman(discountPrice) : formatToman(+price)}{" "}
            </span>
            {discountPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatToman(+price)}
              </span>
            )}
          </div>
        </div>

        {/* hover actions */}
      </Card>
    </Link>
  );
}
