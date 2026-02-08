"use client";
import Responsive from "@/components/common/Responsive";
import { Button } from "@/components/ui/button";
import { sortItems } from "@/data/assets";
import { ArrowDownWideNarrowIcon } from "lucide-react";
import React from "react";
import ProductSortSheet from "./ProductSortSheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortItem } from "@/types/product";

type Props = {};

export default function SortSelect({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const sortBy = searchParams.get("sortBy") || "newest";
  const handleSort = (sortItem: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortItem);

    router.replace(`${pathName}?${params}`);
  };
  return (
    <React.Fragment>
      <Responsive visible="desktop">
        <div className="flex">
          <div className="flex text-sm text-neutral-700 items-center">
            <ArrowDownWideNarrowIcon className="size-5" />
            <span className="ps-2">مرتب سازی:</span>
          </div>
          {sortItems.map((item) => (
            <Button
              size={"sm"}
              color={sortBy === item.value ? "primary" : "neutral"}
              variant={"text-nohover"}
              onClick={() => handleSort(item.value)}
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
