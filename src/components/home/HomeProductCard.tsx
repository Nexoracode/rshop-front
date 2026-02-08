"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { HomeSectionProduct } from "@/types/home";
import Image from "../common/Image";
import { calcPrice } from "@/lib/utils/number";
import { formatToman } from "@/lib/utils/price";
import { cn } from "@/lib/utils/classnames";

export default function HomeProductCard(props: HomeSectionProduct) {
  const { name, price, discount_percent, discount_amount, id, image, brand } =
    props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link className="block h-full" href={`/p/rsp-${id}`}>
      <Card
        className="group h-full gap-2 md:gap-3 bg-background relative overflow-hidden border !p-1 md:p-2 shadow-sm transition hover:shadow-md"
        dir="rtl"
      >
        {/* image */}
        <div className="relative rounded-xl aspect-[1/1] w-full overflow-hidden">
          <Image
            src={image || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className={cn("object-cover")}
          />
        </div>

        {/* content */}
        <div className="mt-2 flex-1 justify-between flex flex-col px-1 pb-2">
          {brand ? <p className="text-xs text-gray-500">{brand.name}</p> : null}
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
            {name}
          </h3>

          {/* price */}
          <div className="flex flex-col items-center gap-2">
            {compareAt && (
              <div className="flex gap-3">
                <Badge className="px-1 leading-0" variant="danger">
                  {percent}%
                </Badge>
                <span className="text-xs text-gray-400 line-through">
                  {formatToman(compareAt)}
                </span>
              </div>
            )}
            <span className="text-base font-bold">{formatToman(final)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
