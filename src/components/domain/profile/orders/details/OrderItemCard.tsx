"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "@/types/order";
import PriceBox from "@/components/common/PriceBox";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

type Props = {
  item: OrderItem;
};

export default function OrderItemCard({
  item: { product, variant, unit_price, ...item },
}: Props) {

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex">
        <div className="relative w-28 aspect-square">
          <Image
            src={product.image || ""}
            alt={product.name}
            fill
            className="rounded-md object-cover border"
          />

          <Badge
            variant={"secondary"}
            className="absolute rounded-sm w-4 h-4 bottom-1 left-1"
          >
            {item.quantity}
          </Badge>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <p className="text-sm font-medium text-neutral-700">{product.name}</p>
          {variant && (
            <div>
              {variant.attributes.map((attr) => (
                <span
                  key={attr.name}
                  className="text-xs text-muted-light inline-block px-2 first:pr-0 border-l-2 last:border-l-0"
                >
                  {attr.name}:{" "}
                  <span className="text-muted font-medium">{attr.value}</span>
                </span>
              ))}
            </div>
          )}
          <PriceBox
            className="font-medium text-primary mt-1"
            price={+unit_price || 2500}
          />

          <div className="flex w-full justify-end">
            <Button
              variant={"outline"}
              size={"sm"}
              startIcon={<EyeIcon />}
              href={`/p/rsp-${product.id}`}
            >
              مشاهده محصول
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
