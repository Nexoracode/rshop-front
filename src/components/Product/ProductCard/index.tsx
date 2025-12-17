import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { calcPrice, cn, formatToman } from "@/lib/utils";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Product } from "@/types/product";

export default function ProductCard(props: Product) {
  const {
    name,
    stock,
    price,
    discount_amount,
    discount_percent,
    media_pinned,
    medias,
    id,
    brand,
    variants,
    has_variants,
  } = props;

  /* const mapVaraintAttributes = (): Array<any> => {
    const result: Array<any> = [];

    const attributes = variants[0].attributes.map((attr) => ({
      id: attr.id,
      type: attr.type,
    }));

    const values = attributes.map(attr=>{
       return variants.map(varaint=>varaint.attributes.find())
    })

    return result;
  }; */

  const getPriceParams = (): {
    priceParams: [number, number, number];
    stock: number;
  } | null => {
    if (!has_variants && stock > 0)
      return {
        priceParams: [+price, +discount_amount, discount_percent],
        stock,
      };

    const varaintHasStock = variants.find((varaint) => varaint.stock > 0);

    if (varaintHasStock)
      return {
        priceParams: [
          varaintHasStock.price,
          varaintHasStock.discount_amount,
          varaintHasStock.discount_percent,
        ],
        stock: varaintHasStock.stock,
      };

    return null;
  };

  const inStock = getPriceParams();
  //const inStock = null;

  const {
    final = 0,
    percent = 0,
    compareAt = null,
  } = inStock ? calcPrice(...inStock.priceParams) : {};
  return (
    <Link href={`/p/rsp-${id}`}>
      <Card
        className="group gap-2 md:gap-3 relative overflow-hidden border !p-1 md:!p-2 shadow-sm transition hover:shadow-md"
        dir="rtl"
      >
        {compareAt && (
          <Badge variant="danger" className="absolute left-2 top-2 z-10 ">
            {percent}%
          </Badge>
        )}

        {/* image */}
        <div className="relative rounded-xl aspect-[1/1] w-full overflow-hidden">
          <Image
            src={media_pinned?.url || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className={cn(
              "object-cover opacity-100 ",
              medias.length > 1 &&
                "group-hover:opacity-0 transition-opacity duration-700"
            )}
          />
          {medias?.[1] && (
            <Image
              src={medias[1]?.url || PRODUCT_PLACEHOLDER}
              alt={name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </div>

        {/*  {has_variants && <div>{mapVaraintAttributes().map()}</div>} */}

        {/* content */}
        <div className="mt-2 space-y-1 px-1 pb-2">
          {brand ? <p className="text-xs text-gray-500">{brand.name}</p> : null}
          <h3 className="line-clamp-1 text-sm font-medium text-gray-800">
            {name}
          </h3>

          {/* rating */}
          {/* <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) =>
            i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div> */}

          {/* price */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {inStock ? (
              <>
                <span className="text-base font-bold text-primary-600">
                  {formatToman(final)}
                </span>
                {compareAt && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatToman(+compareAt)}
                  </span>
                )}
              </>
            ) : (
              <span className="block text-right mt-2 font-semibold  text-muted-light w-full">
                ناموجود
              </span>
            )}
          </div>
        </div>

        {/* hover actions */}
      </Card>
    </Link>
  );
}
