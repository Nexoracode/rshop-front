"use client";
import { ProductAttributeGroup as ProductAttributeGroupType } from "@/types/product";
import React from "react";
import ProductAttributeGroup from "./ProductAttributeGroup";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAttributes from "./MobileAttributes";

type Props = {
  attributes: Array<ProductAttributeGroupType>;
};

export default function ProductAttributes({ attributes }: Props) {
  const isMobile = useIsMobile();
  return (
    <section className="pb-5" id="specifications">
      {isMobile ? (
        <MobileAttributes attribute={attributes[0]} />
      ) : (
        attributes
          .sort((a, b) => a.display_order - b.display_order)
          .map((attrGroup) => <ProductAttributeGroup {...attrGroup} />)
      )}
    </section>
  );
}
