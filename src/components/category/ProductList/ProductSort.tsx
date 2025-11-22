"use client";
import { Button } from "@/components/ui/button";
import { sortItems } from "@/data/assets";
import { ArrowDownWideNarrow } from "lucide-react";
import React from "react";
import ProductSortSheet from "./ProductSortSheet";
import Responsive from "@/components/common/Responsive";
import { useSearchParams } from "next/navigation";

export default function ProductSort() {
  const sortBy = useSearchParams().get("sortBy");

  return (
    <React.Fragment>
      <Responsive visible="desktop">
        <div className="flex">
          <div className="flex text-sm text-neutral-700 items-center">
            <ArrowDownWideNarrow className="size-5" />
            <span className="ps-2">مرتب سازی:</span>
          </div>
          {sortItems.map((item) => (
            <Button
              size={"sm"}
              color={sortBy === item.value ? "primary" : "neutral"}
              variant={"text-nohover"}
              href={{
                query: { sortBy: item.value },
              }}
              key={item.label}
              className={"px-2"}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Responsive>

      <Responsive visible="mobile">
        <ProductSortSheet />
      </Responsive>
    </React.Fragment>
  );
}
