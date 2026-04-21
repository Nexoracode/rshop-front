import { Separator } from "@/components/ui/separator";
import { ProductCartVariant } from "@/types/product";
import React from "react";

type Props = {
  variant: ProductCartVariant | null;
};

export default function CartItemVariant({ variant }: Props) {
  if (!variant) return null;
  return (
    <div className="flex gap-1">
      {variant?.attributes
        .sort((a, b) => a.attribute.display_order - b.attribute.display_order)
        .map((i) => (
          <>
            <p className="text-sm flex items-center gap-1" key={i.id}>
              {i.attribute.type === "color" ? (
                <span
                  className="w-3 h-3 ml-1 rounded-full inline-block"
                  style={{ backgroundColor: `${i.value.display_color}` }}
                ></span>
              ) : (
                <>
                  <span className="font-normal text-muted !text-[13px]">
                    {i.attribute.name}
                  </span>{" "}
                  :{" "}
                </>
              )}

              <span className="font-medium text-neutral-900 !text-[13px]">
                {i.value.value}
              </span>
            </p>
            <Separator orientation="vertical" />
          </>
        ))}
    </div>
  );
}
