import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import ProductGridItem from "@/components/shared/product/ProductGridItem";
import { Product } from "@/types/product";
import React from "react";

type Props = {
  products: Array<Product>;
  isFetchingNextPage?: boolean;
};

export default function ProductGrid({ products, isFetchingNextPage }: Props) {
  return (
    <div className="flex-1 grid grid-cols-1 min-[340px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`hover:z-20 hover:shadow-around`}
        >
          <ProductGridItem key={product.id} product={product} />
        </div>
      ))}
      {isFetchingNextPage && <ProductCardSkeleton count={10} />}
    </div>
  );
}
