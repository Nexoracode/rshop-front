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
      className="inline-flex items-center border-slate-200 py-4.5 hover:bg-transparent"
      aria-label="بازگشت به بالا"
      endIcon={<ChevronUp className="h-4.5 w-4.5 text-gray-500" />}
    >
      <span className="hidden sm:inline-block text-gray-500">بازگشت به بالا</span>
    </Button>
  );
}
