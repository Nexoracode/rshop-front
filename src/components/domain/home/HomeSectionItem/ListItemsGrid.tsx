import { HomeSectionProduct } from "@/types/home";
import React from "react";
import ProductListItem from "../ProductListItem";
import { cn } from "@/lib/utils/classnames";

type Props = {
  products: Array<HomeSectionProduct>;
};

export default function ListItemsGrid({ products }: Props) {
  const roundedProducts =
    products.length % 4 === 0
      ? products
      : [...products, ...Array(4 - (products.length % 4)).keys()];
  return (
    <div className="grid grid-cols-4">
      {roundedProducts.map((product, index) => (
        <div
          className={cn()}
          key={index}
        >
          {typeof product !== "number" && (
            <ProductListItem
              {...product}
              num={index + 1}
              className={cn(
                "border-b",
                index > roundedProducts.length - 5 && "border-b-0",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
