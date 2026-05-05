import { ProductAttributeGroup as ProductAttributeGroupType } from "@/types/product";
import React from "react";
import ProductAttributes from "./ProductAttributes";
import ProductAttributesList from "./ProductAttributesList";

export default function ProductAttributeGroup({
  name,
  attributes,
}: ProductAttributeGroupType) {
  return (
    <div className="flex flex-col items-start md:flex-row justify-between">
      <p className="w-[200px] pt-2 text-muted text-sm font-medium">{name}</p>

      <ProductAttributesList attributes={attributes} />
    </div>
  );
}
