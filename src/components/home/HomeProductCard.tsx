"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { calcPrice, cn, formatToman } from "@/lib/utils";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { HomeSectionProduct } from "@/types/home";

export default function HomeProductCard(props: HomeSectionProduct) {
  const { name, price, discount_percent, discount_amount, id, image, brand } =
    props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent
  );

  return (
    <Link href={`/p/rsp-${id}`}>
      <Card
        className="group gap-2 md:gap-3 relative overflow-hidden border !p-1 md:!p-2 shadow-sm transition hover:shadow-md"
        dir="rtl"
      >
        {/* top right: discount */}
        {compareAt && (
          <Badge variant="danger" className="absolute left-4 top-4 z-10 ">
            {percent}%
          </Badge>
        )}

        {/* image */}
        <div className="relative rounded-xl aspect-[1/1] w-full overflow-hidden">
          <Image
            src={image || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className={cn("object-cover opacity-100 ")}
          />
        </div>

        {/* <div>
          {variants
            .map((variant) =>
              variant.attributes.find((attribute) => attribute.type === "color")
            )
            .filter((a) => a !== null)
            .map((a) => a?.values)
            .flat()
            .map((value) => value?.display_color)
            .reduce((a, c) => (a.includes[c] ? a : [...a, c]), [])}
        </div> */}

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
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-base font-bold text-primary-600">
              {formatToman(final)}
            </span>
            {compareAt && (
              <span className="text-xs text-gray-400 line-through">
                {formatToman(compareAt)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
