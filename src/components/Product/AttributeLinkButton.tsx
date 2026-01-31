"use client";
import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import useScrollToSection from "@/hooks/useScrollToSection";
import { Separator } from "../ui/separator";

export default function AttributeLinkButton() {
  const { handleScrollTo } = useScrollToSection();
  return (
    <div className="flex items-center justify-between gap-3">
      <Separator className="flex-1" />
      <div
        role="button"
        className="flex cursor-pointer gap-4 justify-between border bg-background border-muted-light/20 w-[calc(33.333%-)] rounded-md p-3"
        onClick={() => handleScrollTo("specifications")}
      >
        <p className="text-sm text-muted "> مشاهده همه ویژگی ها</p>

        <ChevronLeftIcon strokeWidth={2} className="size-4" />
      </div>
      <Separator className="flex-1" />
    </div>
  );
}
