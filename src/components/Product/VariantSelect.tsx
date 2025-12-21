"use client";
import { useProductPage } from "@/components/Product/ProductProvider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ProductAttribute } from "@/types/product";

import React, { useMemo } from "react";

type Props = {
  attribute: ProductAttribute;
};

export default function VariantSelect({ attribute }: Props) {
  const { type, name, values, id } = attribute;
  const { variant, selectAttributeVariant } = useProductPage();

  const currentAttributeValue = useMemo(
    () => variant?.attributes.find((a) => a.id === id),
    [variant, id]
  );

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">
        {name} : {currentAttributeValue?.values.value}
      </Label>

      {type === "color" ? (
        <RadioGroup
          value={String(currentAttributeValue?.values.id)}
          onValueChange={(v) => selectAttributeVariant(id, +v)}
          className="flex flex-wrap gap-3"
        >
          {values.map((value) => (
            <Tooltip key={value.id}>
              <TooltipTrigger asChild>
                <Label
                  htmlFor={`color-${value.id}`}
                  className={cn(
                    "relative  rounded-full p-0.5 cursor-pointer border-1 inline-flex items-center gap-2 data-[state=checked]:ring-2 data-[state=checked]:ring-ring data-[state=checked]:ring-offset-2",
                    currentAttributeValue?.values.id === value.id &&
                      "ring-2 ring-primary"
                  )}
                >
                  <RadioGroupItem
                    id={`color-${value.id}`}
                    value={String(value.id)}
                    className="sr-only"
                  />
                  <span
                    className="inline-block h-8 w-8 rounded-full border"
                    style={{ backgroundColor: value.display_color ?? "#fff" }}
                    aria-hidden
                  />
                </Label>
              </TooltipTrigger>

              <TooltipContent>{value.value}</TooltipContent>
            </Tooltip>
          ))}
        </RadioGroup>
      ) : (
        <RadioGroup
          value={String(currentAttributeValue?.values.id)}
          onValueChange={(v) => selectAttributeVariant(id, +v)}
          className="flex flex-wrap gap-2"
        >
          {values.map((value) => (
            <Label
              key={value.id}
              htmlFor={`size-${value.id}`}
              className={cn(
                "h-9 min-w-[3rem] rounded-md px-3 cursor-pointer border inline-flex items-center justify-center text-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-transparent",
                currentAttributeValue?.values.id === value.id &&
                  "border-2 border-primary "
              )}
            >
              <RadioGroupItem
                id={`size-${value.id}`}
                value={String(value.id)}
                className="sr-only"
              />
              {value.value}
            </Label>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
