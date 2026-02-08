import ProductGridItem from "@/components/shared/product/ProductGridItem";
import { Product } from "@/types/product";
import React from "react";

type Props = {
  products: Array<Product>;
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="flex-1 grid grid-cols-1 min-[340px]:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="border-b hover:z-20 hover:shadow-around border-l 2xl:nth-[5n]:border-l-0 xl:nth-[4n]:border-l-0 lg:nth-[3n]:border-l-0 sm:nth-[2n]:border-l-0 2xl:nth-[4n]:border-l xl:nth-[3n]:border-l lg:nth-[2n]:border-l"
        >
          <ProductGridItem key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
}
