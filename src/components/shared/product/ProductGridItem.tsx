import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import useProductPrice from "@/hooks/product/useProductPrice";
import { cn } from "@/lib/utils/classnames";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceBox from "./PriceBox";
import { Badge } from "@/components/ui/badge";

type Props = {
  product: Product;
};

export default function ProductGridItem({ product }: Props) {
  const {
    is_feautered,
    media_pinned,
    medias,
    name,
    brand,
    id,
    discount_amount,
    discount_percent,
    has_variants,
    price,
    stock,
    variants,
  } = product;
  const { final, compareAt, percent, inStock } = useProductPrice({
    discount_amount,
    discount_percent,
    has_variants,
    price,
    stock,
    variants,
  });
  return (
    <Link target="_blank" className="block p-2 bg-white !h-[360px]" href={`/p/rsp-${id}`}>
      {is_feautered && (
        <span className="absolute top-2 z-10 text-danger text-sm font-bold">
          فروش ویژه
        </span>
      )}

      {/* image */}
      <div className="relative aspect-[1/1] w-full overflow-hidden">
        <Image
          src={media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className={cn(
            "object-cover opacity-100 p-4",
            medias.length > 1 &&
              "group-hover:opacity-0 transition-opacity duration-700",
          )}
          style={{ borderRadius: "30px" }}
        />
        {medias?.[1] && (
          <Image
            src={medias[1]?.url || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className="object-cover p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ borderRadius: "30px" }}
          />
        )}
      </div>
      <div className="mt-2 space-y-1 px-1 pb-2">
        <p className="text-xs text-gray-500 mb-2">
          {brand ? brand.name : "برند ندارد"}
        </p>
        <h3 className="line-clamp-1 text-sm font-medium text-gray-800">
          {name}
        </h3>

        <div className="flex mt-3 flex-col sm:flex-row items-center gap-2">
          {inStock ? (
            <div className="flex items-start w-full justify-between">
              {compareAt ? (
                <Badge variant="danger">{percent}%</Badge>
              ) : (
                <div></div>
              )}
              <div className="flex flex-col">
                <PriceBox price={final} className="text-base font-bold" />
                {compareAt ? (
                  <PriceBox
                    price={compareAt}
                    className="text-xs text-gray-400"
                  />
                ) : (
                  <div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span className="block text-left font-medium text-muted-light w-full">
              ناموجود
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
