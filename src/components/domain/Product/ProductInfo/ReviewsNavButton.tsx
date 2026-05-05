"use client";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/utils/price";
import { ChevronLeftIcon } from "lucide-react";
import React from "react";

type Props = {
  reviews_count: number;
};

export default function ReviewsNavButton({ reviews_count }: Props) {
  const handleScrollTo = () => {
    const el = document.getElementById("reviews");
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <Button
      variant="outline"
      color="warning"
      onClick={handleScrollTo}
      rounded={"full"}
      endIcon={<ChevronLeftIcon className="size-4" />}
      className="px-1 h-6 text-xs leading-0"
    >
      <span className="leading-0">{toFaDigits(reviews_count)} دیدگاه</span>
    </Button>
  );
}
