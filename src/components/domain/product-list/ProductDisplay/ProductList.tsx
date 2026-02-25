import ProductListItem from "@/components/shared/product/ProductListItem";
import { Product } from "@/types/product";
import React from "react";
import ProductListItemSkeleton from "../Skeleton/ProductListItemSkeleton";

type Props = {
  products: Array<Product>;
  isFetchingNextPage?: boolean;
};

export default function ProductList({ products, isFetchingNextPage }: Props) {
  return (
    <div className="flex-1 gap-3 grid grid-cols-1">
      {products.map((product) => (
        <ProductListItem {...product} key={product.id} />
      ))}

      {isFetchingNextPage && <ProductListItemSkeleton count={3} />}
    </div>
  );
}
