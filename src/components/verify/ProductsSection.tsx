import { VerifyOrder } from "@/types/order";
import React from "react";
import Image from "../common/Image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Card } from "../ui/card";
import VariantValues from "../Product/VariantValues";
import { BoxesIcon } from "lucide-react";

type Props = {
  orderItems: VerifyOrder["items"];
};

export default function ProductsSection({ orderItems }: Props) {
  return (
    <Card>
      <div className="flex gap-2">
        <BoxesIcon className="text-primary" />
        <h3 className="font-semibold text-gray-800  mb-2">
          محصولات خریداری شده
        </h3>
      </div>
      <div className="space-y-2 flex flex-wrap justify-start">
        {orderItems.map(({ product, variant, ...item }) => (
          <div
            key={item.id}
            className="flex p-1 border rounded-md w-full  gap-3"
          >
            <Image
              src={product.media_pinned?.url ?? PRODUCT_PLACEHOLDER}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col justify-evenly">
              <p className="text-gray-900  text-sm">{product.name}</p>
              {variant && <VariantValues variant={variant} />}
              <p className="text-gray-500 text-xs">تعداد {item.quantity}</p>
              <p className="text-gray-500 text-xs">{item.line_total} تومان</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
