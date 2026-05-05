import React from "react";
import ProductAttributeGroup from "./ProductAttributeGroup";
import { ProductAttributeGroup as ProductAttributeGroupType } from "@/types/product";
import MoreProductAttribute from "./MoreProductAttribute";

type Props = {
  attribute: ProductAttributeGroupType | undefined;
};

export default function MobileAttributes({ attribute }: Props) {
  return (
    <section className="pb-5 -mt-4" id="specifications">
      {attribute ? <ProductAttributeGroup {...attribute} /> : null}

      <MoreProductAttribute />
    </section>
  );
}
