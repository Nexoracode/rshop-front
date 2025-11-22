import { ProductAttributeGroup } from "@/types/product";
import React from "react";
import SectionTitle from "../common/SectionTitle";

type Props = {
  attributes: Array<ProductAttributeGroup>;
};

export default function ProductAttributes({ attributes }: Props) {
  return (
    <section id="specifications">
      <SectionTitle title="مشخصات" />

      {attributes
        .sort((a, b) => a.display_order - b.display_order)
        .map((attrGroup) => (
          <div
            key={attrGroup.id}
            className="flex flex-col md:flex-row justify-between"
          >
            <p className="w-[200px] py-5">{attrGroup.name}</p>

            <div className="flex-1">
              {attrGroup.attributes
                .sort((a, b) => a.display_order - b.display_order)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex  border-muted/30 items-stretch"
                  >
                    <span className="text-muted/60 border-b md:border-b-0 border-l text-xs md:text-sm bg-muted/10 md:bg-transparent md:border-l-0  w-24 md:w-40 p-2">
                      {item.name}
                    </span>

                    <div className="flex-1 border-b ps-2">
                      {item.values
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((v) => (
                          <span
                            className="block  text-xs md:text-sm text-muted leading-8"
                            key={v.id}
                          >
                            {v.value}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
