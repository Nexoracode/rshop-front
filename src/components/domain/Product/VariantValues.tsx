import { ProductVariant } from "@/types/product";
import React from "react";

type Props = {
  variant: ProductVariant;
};

export default function VariantValues({ variant }: Props) {
  return (
    <div className="flex gap-1 items-center">
      {variant?.attributes.map((i, index) => {
        const attributeValue = i.value || i.values;
        return (
          <React.Fragment key={i.id}>
            <p className="text-xs flex items-center" key={i.id}>
              {i.type === "color" && (
                <span
                  className="inline-block me-1 w-3 h-3 rounded-full border"
                  style={{
                    backgroundColor: attributeValue.display_color || "#fff",
                  }}
                ></span>
              )}
              <span className="font-medium text-neutral-900">
                {attributeValue.value}
              </span>
            </p>
            {index !== variant.attributes.length - 1 && (
              <div className="w-[1px] h-4 mx-2 bg-muted-light"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
