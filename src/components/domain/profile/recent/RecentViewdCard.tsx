"use client";

import Image from "next/image";
import { RecentView } from "@/types/user";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { calcPrice } from "@/lib/utils/number";
import { Badge } from "@/components/ui/badge";
import PriceBox from "@/components/shared/product/PriceBox";

export default function RecentViewedCard({
  product: { id, image, name, price, discount_amount, discount_percent, stock },
}: RecentView) {
  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link
      className={`flex flex-col bg-white !h-[254px] select-none`}
      href={`/p/rsp-${id}`}
    >
      {/* image */}
      <div className="relative mt-2 bg-white w-full flex items-center justify-center">
        <Image
          src={image || PRODUCT_PLACEHOLDER}
          alt={name}
          width={132}
          height={132}
          className="w-[132px] h-[132px] object-cover rounded-lg"
        />
      </div>

      {/* content */}
      <div className="mt-4 flex-1 justify-between flex flex-col px-2 pb-3">
        <h3 className="line-clamp-2 text-[13px] font-medium px-2 text-gray-600">
          {name}
        </h3>
        {stock > 0 ? (
          <div className="flex pb-2 mt-2 justify-between items-end gap-2 px-2">
            {compareAt ? (
              <Badge variant="danger">{percent}%</Badge>
            ) : (
              <div></div>
            )}
            <div className="flex items-end flex-col">
              <PriceBox price={final} className="text-base font-bold" />
              {compareAt ? (
                <PriceBox
                  price={compareAt}
                  className="text-xs text-gray-400 line-through"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-muted-light">ناموجود</div>
        )}
      </div>
    </Link>
  );
}
