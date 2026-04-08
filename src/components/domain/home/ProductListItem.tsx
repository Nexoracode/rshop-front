"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeSectionProduct } from "@/types/home";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { cn } from "@/lib/utils/classnames";

export default function ProductListItem(
  props: HomeSectionProduct & { num?: number; className?: string },
) {
  const {
    name,
    brand,
    image,
    num,
    id,
    className,
  } = props;

/*   const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  ); */

  return (
    <Link target="_blank" href={`/p/rsp-${id}`} className="!w-[313px] !select-none">
      <div className="flex border md:border-0 w-full">
        <div className="w-[5rem] md:w-[7rem] aspect-square space-y-2">
          <div className="relative aspect-[1/1]  overflow-hidden">
            <Image
              src={image || PRODUCT_PLACEHOLDER}
              alt={name}
              fill
              className="object-cover !rounded-2xl p-3 md:p-2"
            />
          </div>
        </div>

        <div className={cn("flex flex-3/4", className)}>
          {num && (
            <div className="text-info-300 text-2xl font-medium flex items-center pr-3">
              {num}
            </div>
          )}
          <div className="gap-y-3 flex-1 flex flex-col justify-center px-3">
            <div>
              {brand ? (
                <p className="text-xs text-muted/80">{brand.name}</p>
              ) : null}

              <h4 className="line-clamp-2 text-[13px] font-medium text-gray-600">{name}</h4>
            </div>

           {/*  {compareAt && (
              <Badge variant={"danger"} className="absolute top-2 left-2 ">
                {percent}%
              </Badge>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  );
}
