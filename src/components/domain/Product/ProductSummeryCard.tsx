"use client";

import { Product } from "@/types/product";
import React from "react";
import { Card } from "../../ui/card";
import Image from "../../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import AddToCartButton from "./AddToCart/AddToCartButton";
import ProductPriceInfo from "./ProductInfo/ProductPriceInfo";
import usePromotionPadding from "@/hooks/usePromotionPadding";
import VariantValues from "./VariantValues";
import { cn } from "@/lib/utils/classnames";
import useProductVariantUrl from "@/hooks/useProductVariantUrl";

export default function ProductSummeryCard(product: Product) {
  const { media_pinned, name } = product;
  const { bannerExists } = usePromotionPadding();

  const { selectedVariant: variant } = useProductVariantUrl(product.variants);

  return (
    <Card
      className={cn(
        "hidden space-y-4 md:block w-[300px] sticky !rounded-none top-2 mt-14 h-fit border-y-0 border-l-0 border-r",
        bannerExists && "top-[10rem]",
      )}
    >
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

          {variant && <VariantValues variant={variant} />}
        </div>
      </div>

      <AddToCartButton product={product}>
        <div className="my-2">
          <ProductPriceInfo {...product} />
        </div>
      </AddToCartButton>
    </Card>
  );
}
