import { ProductAttributeGroup } from "@/types/product";
import React from "react";

type Props = {
  attributes: Array<ProductAttributeGroup>;
};

export default function ProductAttributes({ attributes }: Props) {
  return (
    <section id="specifications">
      <h4 className="text-primary text-3xl font-semibold mb-1">مشخصات</h4>

      {attributes
        .sort((a, b) => a.display_order - b.display_order)
        .map((attrGroup) => (
          <div key={attrGroup.id} className="flex justify-between">
            <p className="w-[200px]">{attrGroup.name}</p>

            <div className="flex-1">
              {attrGroup.attributes
                .sort((a, b) => a.display_order - b.display_order)
                .map((item) => (
                  <div key={item.id} className="flex items-start gap-5">
                    <span className="text-muted-foreground w-40">
                      {item.name}
                    </span>

                    <div className="pb-5 border-b flex-1">
                      {item.values
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((v) => (
                          <span className="block text-sm leading-8" key={v.id}>
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
