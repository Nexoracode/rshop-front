"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import AddToCompareBtn from "./AddToCompareBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";
import { formatToman } from "@/lib/utils";
import CountdownTimer from "@/components/modules/product/CountdownTimer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

export default function SpecialProductCart(props: Product) {
  const {
    id,
    name,
    price,
    discount_amount,
    discount_percent,
    media_pinned,
    medias,
    brand,
  } = props;

  const discountPrice = discount_amount
    ? Number(price) - Number(discount_amount)
    : discount_percent
    ? (Number(price) * Number(discount_percent)) / 100
    : null;

  return (
    <Card
      className="group relative overflow-hidden border !p-2 shadow-sm transition hover:shadow-md"
      dir="rtl"
    >
      <div className="flex items-start">
        <div className="relative aspect-[1/1] flex-2/5 overflow-hidden">
          <Image
            src={media_pinned?.url || "/mock/image_1.jpg"}
            alt={name}
            fill
            className="object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-700"
          />
          {medias?.[1] && (
            <Image
              src={medias[1]?.url || "/mock/image_1.jpg"}
              alt={name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          <div className="absolute z-20  gap-y-0.5 flex flex-col right-0 top-1">
            <div className="flex translate-x-12 ease-in-out duration-500 group-hover:translate-x-0 transition-transform flex-col gap-y-0.5">
              <AddToWishlistBtn id={id} />
              <AddToCompareBtn productId={id} />
            </div>
          </div>
        </div>

        <div className="flex-3/5 gap-y-4 flex flex-col justify-between p-3">
          <div>
            {brand ? (
              <p className="text-xs text-destructive">{brand.name}</p>
            ) : null}

            <Link
              href={"/product/1"}
              className="line-clamp-1 text-lg text-foreground  font-semibold"
            >
              {name}
            </Link>
          </div>

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
                {price.toLocaleString()} تومان
              </span>
            )}
          </div>

          <CountdownTimer targetDate="2025-09-10T23:59:59" />

          <Link href={`/products/${props.id}`}>
            <Button className="rounded-full">مشاهده محصول</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
