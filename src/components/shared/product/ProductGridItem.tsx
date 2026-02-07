import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { cn } from "@/lib/utils/classnames";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

export default function ProductGridItem({ product }: Props) {
  const { is_feautered, media_pinned, medias, name, brand } = product;
  return (
    <Link className="block" href={`/p/rsp-${id}`}>
      {is_feautered && (
        <span className="absolute top-2 z-10 text-danger text-sm font-bold">
          فروش ویژه
        </span>
      )}

      {/* image */}
      <div className="relative rounded-sm aspect-[1/1] w-full overflow-hidden">
        <Image
          src={media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className={cn(
            "object-cover opacity-100 ",
            medias.length > 1 &&
              "group-hover:opacity-0 transition-opacity duration-700",
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
        <div className="flex mt-3 flex-col sm:flex-row items-center gap-2">
          {inStock ? (
            <div className="flex items-start w-full justify-between">
              {compareAt && <Badge variant="danger">{percent}%</Badge>}
              <div className="flex flex-col">
                <PriceBox price={final} className="text-base font-bold" />
                {compareAt && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatToman(+compareAt)}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="block text-right mt-2 font-semibold  text-muted-light w-full">
              ناموجود
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
