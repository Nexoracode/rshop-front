"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HomeSectionProduct } from "@/types/home";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { formatToman } from "@/lib/utils/price";
import { calcPrice } from "@/lib/utils/number";

export default function SpecialProductCart(
  props: HomeSectionProduct & { num?: number },
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
  } = props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link target="_blank" href={`/p/rsp-${id}`}>
      <Card
        className="group container-home relative overflow-hidden border-0 rounded-none bg-background !p-2"
        dir="rtl"
      >
        <div className="flex items-stretch">
          <div className="flex-1/3 space-y-2">
            <div className="relative aspect-[1/1]  overflow-hidden">
              <Image
                src={image || PRODUCT_PLACEHOLDER}
                alt={name}
                fill
                className="object-cover rounded-md border p-1"
              />
            </div>
          </div>

          <div className="flex flex-3/4 ">
            {num && (
              <div className="text-info-400 text-2xl font-semibold flex items-center pr-3">
                {num}
              </div>
            )}
            <div className="gap-y-3 border-b flex-1 flex flex-col justify-center px-3">
              <div>
                {brand ? (
                  <p className="text-xs text-muted/80">{brand.name}</p>
                ) : null}

                <h4 className="line-clamp-2 text-sm text-foreground  font-semibold">
                  {name}
                </h4>
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

              {/* <CountdownTimer showIcon={false} targetDate="2025-12-10T23:59:59" /> */}

              {compareAt && (
                <Badge variant={"danger"} className="absolute top-2 left-2 ">
                  {percent}%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
