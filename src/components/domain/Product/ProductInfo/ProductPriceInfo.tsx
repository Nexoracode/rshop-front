"use client";
import React from "react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import PriceBox from "@/components/common/PriceBox";
import { formatToman } from "@/lib/utils/price";
import { calcPrice } from "@/lib/utils/number";
import useProductVariantUrl from "@/hooks/useProductVariantUrl";

export default function ProductPriceInfo({
  stock,
  price,
  discount_amount,
  discount_percent,
  is_limited_stock,
  variants,
}: Product) {
  const { selectedVariant: variant } = useProductVariantUrl(variants);

  //if (variantLoading) return <Skeleton className="h-9" />;

  const calcPriceParams: Parameters<typeof calcPrice> = variant
    ? [variant.price, variant.discount_amount, variant.discount_percent]
    : [price, discount_amount, discount_percent];
  const { compareAt, final, percent } = calcPrice(...calcPriceParams);

  let productStock = 9999;

  if (!is_limited_stock) {
    productStock = variant ? variant.stock : stock;
  }
  return productStock ? (
    <div className="flex flex-row-reverse items-center justify-between md:w-full md:gap-3">
      <div>
        <PriceBox className="text-xl font-bold text-black" price={final} />
      </div>
      {compareAt && compareAt > final ? (
        <div className="flex flex-col-reverse gap-1 items-center">
          <span className="text-slate-700 text-[15px] line-through">
            {formatToman(compareAt, false)}
          </span>
          {percent > 0 && (
            <Badge variant="success-outline" className="rounded-full text-xs">
              {percent}% <span className="hidden md:inline-block">تخفیف</span>
            </Badge>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    "ناموجود"
  );
}
