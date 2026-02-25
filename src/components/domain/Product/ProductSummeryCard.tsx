"use client";
import { Product } from "@/types/product";
import React from "react";
import { Card } from "../../ui/card";
import Image from "../../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import AddToCartButton from "./AddToCart/AddToCartButton";
import { Separator } from "../../ui/separator";
import ProductPriceInfo from "./ProductInfo/ProductPriceInfo";
import usePromotionPadding from "@/hooks/usePromotionPadding";
import VariantValues from "./VariantValues";
import { ShoppingBagIcon, StoreIcon, ZapIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import useProductVariantUrl from "@/hooks/useProductVariantUrl";

export default function ProductSummeryCard(product: Product) {
  const { media_pinned, name } = product;
  const { bannerExists } = usePromotionPadding();

  const { selectedVariant: variant } = useProductVariantUrl(product.variants);

  return (
    <Card
      className={cn(
        "hidden space-y-4 md:block w-[300px] sticky top-[5rem] h-fit",
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
      <Separator />

      <ProductPriceInfo {...product} />

      <Separator />

      <AddToCartButton product={product} />

      <div>
        <div className="flex items-center text-sm  text-primary py-1 gap-2">
          <StoreIcon className="text-primary size-5" />
          آرشاب
        </div>
        <div className="flex items-center text-muted-light text-xs py-1 gap-2">
          <ShoppingBagIcon className="text-black size-4" />
          موجود در انبار آرشاب
        </div>

        <div className="flex items-center text-muted-light text-xs py-1 gap-2">
          <ZapIcon className="text-secondary size-4" />
          ارسال در سریع ترین زمان
        </div>
      </div>
    </Card>
  );
}
