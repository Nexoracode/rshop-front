import { ProductVariant } from "@/types/product";
import React from "react";

type Props = {
  variant: ProductVariant;
};

export default function VariantValues({ variant }: Props) {
  console.log({ variant });
  return (
    <div className="flex gap-1 items-center">
      {variant?.attributes.map((i, index) => (
        <React.Fragment key={i.id}>
          <p className="text-xs flex items-center" key={i.id}>
            {i.type === "color" && (
              <span
                className="inline-block me-1 w-5 h-5 rounded-full border"
                style={{ backgroundColor: i.values.value || "#fff" }}
              ></span>
            )}
            <span className="font-semibold text-neutral-900">
              {i.values.value}
            </span>
          </p>
          {index !== variant.attributes.length - 1 && (
            <div className="w-[1px] h-4 mx-2 bg-muted-light"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
