"use client";
import { Product } from "@/types/product";
import React from "react";
import { Card } from "../ui/card";
import Image from "../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import AddToCartButton from "./AddToCart/AddToCartButton";
import { Separator } from "../ui/separator";
import { useProductPage } from "./ProductProvider";
import ProductPriceInfo from "./ProductInfo/ProductPriceInfo";

export default function ProductSummeryCard(product: Product) {
  const { media_pinned, name } = product;

  const { variant } = useProductPage();

  console.log({ variant });
  return (
    <Card className="hidden space-y-4 md:block min-w-[300px] sticky top-[5rem] flex-1 h-fit">
      <div className="flex items-center">
        <Image
          src={media_pinned?.url || PRODUCT_PLACEHOLDER}
          alt=""
          width={65}
          height={65}
          className="border rounded-md aspect-square"
        />
        <div className="flex-1 pr-2">
          <p className="text-sm line-clamp-2 leading-relaxed text-muted">
            {name}
          </p>

          <div className="flex items-center">
            {variant?.attributes.map((i) => (
              <>
                <p className="text-xs" key={i.id}>
                  <span className="font-light text-muted">{i.name}</span> :{" "}
                  <span className="font-semibold text-neutral-900">
                    {i.values.value}
                  </span>
                </p>
                <Separator orientation="vertical" />
              </>
            ))}
          </div>
        </div>
      </div>
      <Separator />

      <ProductPriceInfo {...product} />

      <Separator />

      <AddToCartButton product={product} />
    </Card>
  );
}
