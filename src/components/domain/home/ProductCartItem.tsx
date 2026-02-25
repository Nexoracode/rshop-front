"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { HomeSectionProduct } from "@/types/home";
import Image from "../../common/Image";
import { calcPrice } from "@/lib/utils/number";
import PriceBox from "@/components/shared/product/PriceBox";

export default function ProductCartItem(props: HomeSectionProduct) {
  const { name, price, discount_percent, discount_amount, id, image, brand } =
    props;

  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link
      target="_blank"
      className="flex flex-col bg-white h-[18rem]"
      href={`/p/rsp-${id}`}
    >
      {/* image */}
      <div className="relative bg-white aspect-[1/1] w-full overflow-hidden">
        <Image
          src={image || PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className={"object-fill p-4"}
        />
      </div>

      {/* content */}
      <div className="mt-2 flex-1 justify-between flex flex-col px-1 pb-2">
        {brand ? <p className="text-xs text-gray-500">{brand.name}</p> : null}
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
          {name}
        </h3>

        {/* price */}
        <div className="flex justify-between items-center gap-2">
          {compareAt && (
            <Badge className="p-0 px-1" variant="danger">
              {percent}%
            </Badge>
          )}
          <div className="flex items-end flex-col">
            <PriceBox price={final} className="text-base font-bold" />
            {compareAt && (
              <PriceBox
                price={compareAt}
                className="text-xs text-gray-400 line-through"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
