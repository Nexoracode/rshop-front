"use client";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import React from "react";

export default function BackToTopButton() {
  return (
    <Button
      variant={"outline"}
      size="sm"
      color="neutral"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2"
      aria-label="بازگشت به بالا"
      endIcon={<ChevronUp className="h-4 w-4" />}
    >
      <span className="hidden sm:inline-block">بازگشت به بالا</span>
    </Button>
  );
}
