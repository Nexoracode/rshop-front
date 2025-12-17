"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Shuffle } from "lucide-react";
import { useCompareList } from "@/queries/compare";
import { useRouter } from "next/navigation";

export default function AddToCompareBtn({ productId }: { productId: number }) {
  const { addToCampare, disable, inCompareList } = useCompareList({
    productId,
  });
  const router = useRouter();
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompareList) router.push("/compare");

    addToCampare(() => router.push("/compare"));
  };
  return (
    <Button
      className="hover:bg-secondary px-1"
      rounded={"full"}
      variant="text"
      color="neutral"
      size="sm"
      disabled={disable}
      onClick={handleAdd}
    >
      <Shuffle />
    </Button>
  );
}
