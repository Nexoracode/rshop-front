import { ProductAttributeGroup as ProductAttributeGroupType } from "@/types/product";
import React from "react";
import ProductAttributesList from "./ProductAttributesList";

export default function ProductAttributeGroup({
  name,
  attributes,
  hiddenGroupName,
}: ProductAttributeGroupType & { hiddenGroupName?: boolean }) {
  return (
    <div className="flex flex-col mt-3 items-start md:flex-row justify-between">
      {!hiddenGroupName ? (
        <p className="w-[200px] pb-2 text-muted text-sm font-medium">{name}</p>
      ) : null}

      <ProductAttributesList attributes={attributes} />
    </div>
  );
}
