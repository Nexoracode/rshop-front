"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatToman } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HomeSectionProduct } from "@/types/home";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";

export default function SpecialProductCart(props: HomeSectionProduct) {
  const { name, price, brand, discount_percentage, discount_price, image } =
    props;

  return (
    <Card
      className="group relative overflow-hidden border !p-2 shadow-sm transition hover:shadow-md"
      dir="rtl"
    >
      <div className="flex items-start">
        <div className="flex-1/3 space-y-2">
          <div className="relative aspect-[1/1]  overflow-hidden">
            <Image
              src={image || PRODUCT_PLACEHOLDER}
              alt={name}
              fill
              className="object-cover rounded-md border p-1 opacity-100 group-hover:opacity-0 transition-opacity duration-700"
            />
          </div>
        </div>

        <div className="flex-3/4 gap-y-3 flex flex-col justify-between px-3">
          <div>
            {brand ? (
              <p className="text-xs text-muted/80">{brand.name}</p>
            ) : null}

            <Link
              href={"/product/1"}
              className="line-clamp-1 text-sm text-foreground  font-semibold"
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
            <span className="text-sm  font-bold text-primary-600">
              {formatToman(discount_percentage ? discount_price : price)}{" "}
            </span>
            {discount_percentage && (
              <span className="text-xs text-gray-400 line-through">
                {formatToman(price)}
              </span>
            )}
          </div>

          {/* <CountdownTimer showIcon={false} targetDate="2025-12-10T23:59:59" /> */}

          {discount_percentage && (
            <Badge variant={"danger"} className="absolute top-2 left-2 ">
              {discount_percentage}%
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
