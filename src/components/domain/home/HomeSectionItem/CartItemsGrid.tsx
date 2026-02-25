import { HomeSectionProduct } from "@/types/home";
import React from "react";
import ProductCartItem from "../ProductCartItem";
import { cn } from "@/lib/utils/classnames";

type Props = {
  products: Array<HomeSectionProduct>;
};

export default function CartItemsGrid({ products }: Props) {
  const roundedProducts =
    products.length % 6 !== 0
      ? [...products, ...Array(6 - (products.length % 6)).map(() => null)]
      : products;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {roundedProducts.map((product, index) => (
        <div
          key={product?.id}
          className={cn(
            "border-l border-b",
            index > roundedProducts.length - 7 && "lg:border-b-0",
            (index + 1) % 6 === 0 && "lg:border-l-0",
          )}
        >
          {product && <ProductCartItem {...product} />}
        </div>
      ))}
    </div>
  );
}
