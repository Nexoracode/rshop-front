"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import FiltersList from "./FiltersList";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductFilterProvider from "./ProductFilterProvider";
import { ProductFilters } from "@/types";

type Props = {
  filters: ProductFilters;
};
export default function ProductFilterSidebar({ filters }: Props) {
  const isMobile = useIsMobile();

  return isMobile ? null : (
    <aside className="w-full md:w-[300px] sticky top-0 overflow-y-auto no-scrollbar  space-y-5">
      <ProductFilterProvider filters={filters}>
        {/* <Card className="px-3">
          <FilterByCategory />
        </Card> */}

        <Card className="px-3 bg-background">
          <FiltersList />
        </Card>
      </ProductFilterProvider>
    </aside>
  );
}
