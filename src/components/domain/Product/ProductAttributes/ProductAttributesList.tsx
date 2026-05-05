import { ProductAttribute } from "@/types/product";
import React from "react";

type Props = {
  attributes: ProductAttribute[];
};

export default function ProductAttributesList({ attributes }: Props) {
  return (
    <div className="flex-1 w-full">
      {attributes
        .sort((a, b) => a.display_order - b.display_order)
        .map((item) => (
          <div
            key={item.id}
            className="flex md:pt-2 w-full first:pt-0 border-muted/30 items-stretch"
          >
            <span className="text-muted/60 border-b md:border-b-0 border-l text-xs md:text-sm bg-muted/10 md:bg-transparent md:border-l-0  w-32 md:w-40 p-2">
              {item.name}
            </span>

            <div className="flex-1 py-2 !px-4 bg-slate-50 rounded-sm">
              {item.values
                .sort((a, b) => a.display_order - b.display_order)
                .map((v) => (
                  <span
                    className="block text-xs md:text-sm text-muted leading-8"
                    key={v.id}
                  >
                    {v.value}
                  </span>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
