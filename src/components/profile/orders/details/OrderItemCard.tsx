"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "@/types/order";
import ProductRating from "@/components/Product/ProductReviews/ProductRating";
import SubmitReviewBtn from "@/components/Product/ProductReviews/SubmitReviewBtn";
import { formatToman } from "@/lib/utils/price";

type Props = {
  item: OrderItem;
};

export default function OrderItemCard({
  item: { product, variant, ...item },
}: Props) {
  return (
    <Card className="p-4  hover:shadow-md transition-all">
      <div className="flex items-start">
        <div className="relative">
          <Image
            src={product.image || ""}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-md object-cover border"
          />

          <Badge className="bg-white/79 p-1 leading-2 rounded-sm absolute bottom-1 left-1">
            {item.quantity}
          </Badge>
        </div>
        <div className="flex-1 pr-3">
          <p className="font-medium text-neutral-700">{product.name}</p>
          {variant && (
            <div>
              {variant.attributes.map((attr) => (
                <span
                  key={attr.name}
                  className="text-xs text-muted-light inline-block px-2 first:pr-0 border-l-2 last:border-l-0"
                >
                  {attr.name}:{" "}
                  <span className="text-muted font-semibold">{attr.value}</span>
                </span>
              ))}
            </div>
          )}
          <p className="font-semibold text-primary mt-1">
            {formatToman(+product.price || 450000)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <ProductRating rating={5} />
        <SubmitReviewBtn
          product_id={product.id}
          product_image={product.image}
          product_name={product.name}
          Trigger={
            <Button
              startIcon={<MessageSquare />}
              variant="outline"
              color="info"
              size="sm"
            >
              ثبت دیدگاه
            </Button>
          }
        />
      </div>
    </Card>
  );
}
