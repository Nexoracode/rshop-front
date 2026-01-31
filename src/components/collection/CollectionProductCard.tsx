"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { calcPrice, formatToman } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { CollectionProduct } from "@/types/product";

export default function CollectionProductCart(props: CollectionProduct) {
  const { name, price, brand, discount_percent, discount_amount, image, id } =
    props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent
  );

  return (
    <Card
      className="group relative overflow-hidden border !p-1 shadow-sm transition hover:shadow-md"
      dir="rtl"
    >
      <Link href={`/p/rsp-${id}`}>
        <div className="flex space-y-2 flex-col items-start">
          <div className="relative w-full aspect-[1/1]  overflow-hidden">
            <Image
              src={image || PRODUCT_PLACEHOLDER}
              alt={name}
              fill
              sizes="150px"
              className="object-cover rounded-md"
            />
          </div>

          <div className="gap-y-3 flex flex-col justify-between px-3">
            <div>
              {brand ? (
                <p className="text-xs text-muted/80">{brand.name}</p>
              ) : null}

              <p className="line-clamp-1 text-sm text-foreground  font-semibold">
                {name}
              </p>
            </div>

            {/* rating */}
            {/* <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) =>
            i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div> */}

            {/* price */}
            <div className="flex items-center gap-2">
              <span className="text-sm  font-bold text-primary-600">
                {formatToman(final)}{" "}
              </span>
              {compareAt && (
                <span className="text-xs text-gray-400 line-through">
                  {formatToman(compareAt)}
                </span>
              )}
            </div>

            {/* <CountdownTimer showIcon={false} targetDate="2025-12-10T23:59:59" /> */}

            {compareAt && (
              <Badge variant={"danger"} className="absolute top-2 left-2 ">
                {percent}%
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
