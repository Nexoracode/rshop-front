import { ProductAttribute } from "@/types/product";
import React from "react";
import AttributeLinkButton from "./AttributeLinkButton";

type Props = {
  specifications: Array<ProductAttribute>;
};

export default function ImportantAttributes({ specifications }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid w-full grid-cols-3 gap-3">
        {specifications.map((attr) => (
          <div
            key={attr.id}
            className="flex flex-col gap-2 bg-muted-light/20 w-[calc(33.333%-)] rounded-md p-2"
          >
            <p className="text-xs text-muted font-light"> {attr.name}:</p>

            <p className="text-sm text-foreground font-medium">
              {attr.values.map((i) => i.value).join(", ")}
            </p>
          </div>
        ))}
      </div>

      <AttributeLinkButton />
    </div>
  );
}
