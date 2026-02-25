"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HomeSectionProduct } from "@/types/home";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { formatToman } from "@/lib/utils/price";
import { calcPrice } from "@/lib/utils/number";
import { cn } from "@/lib/utils/classnames";

export default function ProductListItem(
  props: HomeSectionProduct & { num?: number; className?: string },
) {
  const {
    name,
    price,
    brand,
    discount_percent,
    discount_amount,
    image,
    num,
    id,
    className,
  } = props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link target="_blank" href={`/p/rsp-${id}`}>
      <div className="flex border md:border-0 rounded-lg items-stretch">
        <div className="w-[5rem] md:w-[7rem]  h-[5rem] md:h-[7rem] space-y-2">
          <div className="relative aspect-[1/1]  overflow-hidden">
            <Image
              src={image || PRODUCT_PLACEHOLDER}
              alt={name}
              fill
              className="object-cover p-3 md:p-1"
            />
          </div>
        </div>

        <div className={cn("flex flex-3/4", className)}>
          {num && (
            <div className="text-info-300 text-2xl font-semibold flex items-center pr-3">
              {num}
            </div>
          )}
          <div className="gap-y-3 flex-1 flex flex-col justify-center px-3">
            <div>
              {brand ? (
                <p className="text-xs text-muted/80">{brand.name}</p>
              ) : null}

              <h4 className="line-clamp-2 text-sm  text-foreground">{name}</h4>
            </div>

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

            {compareAt && (
              <Badge variant={"danger"} className="absolute top-2 left-2 ">
                {percent}%
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
