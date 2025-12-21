"use client";
import { calcPrice, formatToman } from "@/lib/utils";
import React from "react";
import { Badge } from "../ui/badge";
import { useProductPage } from "./ProductProvider";
import { Product } from "@/types/product";

export default function ProductPriceInfo({
  stock,
  price,
  discount_amount,
  discount_percent,
}: Product) {
  const { variant } = useProductPage();

  const calcPriceParams: Parameters<typeof calcPrice> = variant
    ? [variant.price, variant.discount_amount, variant.discount_percent]
    : [price, discount_amount, discount_percent];
  const { compareAt, final, percent } = calcPrice(...calcPriceParams);

  const productStock = variant ? variant.stock : stock;
  return (
    <div className="mt-2 flex items-end md:w-full flex-col md:gap-3">
      {productStock === 0 ? (
        <p className="text-center pt-6 w-full text-danger-300 font-medium">
          این محصول فعلا موجود نیست
        </p>
      ) : (
        <>
          <div className="text-xl font-extrabold text-primary">
            {formatToman(final)}
          </div>
          {compareAt && compareAt > final ? (
            <div className="flex gap-1 flex-row-reverse md:justify-between">
              <span className="text-muted text-sm line-through">
                {formatToman(compareAt)}
              </span>
              {percent > 0 && (
                <Badge variant="secondary" className="rounded-full text-xs">
                  {percent}%{" "}
                  <span className="hidden md:inline-block">تخفیف</span>
                </Badge>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
}
