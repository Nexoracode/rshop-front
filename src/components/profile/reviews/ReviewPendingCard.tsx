"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Review } from "@/types/user";

type Props = {
  product: Review["product"];
  onReview: (productId: number) => void;
};

export default function ReviewPendingCard({ product, onReview }: Props) {
  return (
    <Card className="flex bg-background !p-4 hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <Image
          src={product.image}
          alt={product.name}
          width={90}
          height={90}
          className="rounded-md border object-cover"
        />
        <div>
          <p className="font-medium">{product.name}</p>
        </div>
      </div>

      <Button
        startIcon={<MessageCircle />}
        variant="outline"
        size="md"
        onClick={() => onReview(product.id)}
      >
        ثبت دیدگاه
      </Button>
    </Card>
  );
}
