import { VerifyOrder } from "@/types/order";
import React from "react";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { BoxesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "@/components/common/Image";
import VariantValues from "../Product/VariantValues";

type Props = {
  orderItems: VerifyOrder["items"];
};

export default function ProductsSection({ orderItems }: Props) {
  return (
    <Card>
      <div className="flex gap-2">
        <BoxesIcon className="text-primary" />
        <h3 className="font-medium text-gray-800  mb-2">محصولات خریداری شده</h3>
      </div>
      <div className="space-y-2 flex flex-wrap justify-start">
        {orderItems.map(({ product, variant, ...item }) => (
          <div
            key={item.id}
            className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* بخش تصویر با حاشیه گردتر و سایه ملایم */}
            <div className="relative shrink-0">
              <Image
                src={product.media_pinned?.url ?? PRODUCT_PLACEHOLDER}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              {/* نشانگر تعداد روی تصویر */}
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>

            {/* بخش اطلاعات */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                  {product.name}
                </h3>
                {variant && (
                  <div className="mt-1">
                    <VariantValues variant={variant} />
                  </div>
                )}
              </div>

              {/* بخش قیمت */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 text-xs">
                  تعداد: {item.quantity}
                </span>
                <span className="font-semibold text-gray-900 text-sm">
                  {item.line_total.toLocaleString()} تومان
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
