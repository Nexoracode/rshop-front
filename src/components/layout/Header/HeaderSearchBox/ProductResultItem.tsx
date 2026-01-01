import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { calcPrice, formatToman } from "@/lib/utils";
import { ProductSearchResult } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductResultItem({
  id,
  name,
  image,
  price,
  discount_amount,
  discount_percent,
}: ProductSearchResult) {
  const { compareAt, final } = calcPrice(
    price,
    discount_amount,
    discount_percent
  );
  return (
    <li className="w-full md:w-[50%] odd:pl-1 even:pr-1">
      <Link href={`/p/rsp-${id}`} className="flex gap-2 items-stretch">
        <Image
          width={70}
          height={70}
          src={image ?? PRODUCT_PLACEHOLDER}
          alt=""
          className="border size-[4rem] rounded-md p-1 bg-background/30"
        />
        <div className="flex-1 flex flex-col justify-evenly">
          <div className="text-sm leading-6 font-medium">{name}</div>
          <div className="">
            <span className="text-xs font-semibold">{formatToman(final)}</span>{" "}
            {compareAt && (
              <span className="text-xs text-danger-500 line-through">
                {formatToman(compareAt)}
              </span>
            )}{" "}
          </div>
        </div>
      </Link>
    </li>
  );
}
