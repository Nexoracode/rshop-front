import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { ProductSearchResult } from "@/types/product";
import Image from "next/image";
import Link from "@/components/shared/Link";
import React from "react";

const ProductResultItem = React.forwardRef<
  HTMLAnchorElement,
  ProductSearchResult
>(function ProductResultItem({ id, name, image }, ref) {
  return (
    <Link
      href={`/p/rsp-${id}`}
      ref={ref}
      className="flex flex-col items-center gap-3 hover:rounded-lg transition-all duration-200 h-fit hover:bg-gray-50 p-2"
    >
      <div className="relative size-16 rounded-md">
        <Image
          src={image ?? PRODUCT_PLACEHOLDER}
          alt={name}
          fill
          className="object-contain p-0."
          sizes="58px"
        />
      </div>
      <h4 className="text-[13px] font-medium text-gray-600 line-clamp-1">
        {name}
      </h4>
    </Link>
  );
});

export default ProductResultItem;
