"use client";
import React from "react";
import ProductRow from "@/components/common/ProductCard/ProductRow";
import ProductCard from "@/components/common/ProductCard";
import { useProductList } from "../ProductListProvider";
import { Product } from "@/types/product";

type Props = {
  products: Array<Product>;
};

export default function ProductList({ products }: Props) {
  const { view } = useProductList();
  return view === "list" ? (
    <div className="flex-1 gap-3 grid grid-cols-1">
      {products.map((product) => (
        <ProductRow {...product} key={product.id} />
      ))}
    </div>
  ) : (
    <div className="flex-1 gap-3 grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </div>
  );
}
