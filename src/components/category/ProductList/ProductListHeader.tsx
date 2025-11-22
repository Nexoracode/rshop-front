"use client";

import React from "react";
import ProductSort from "./ProductSort";
import ViewModeSelect from "./ViewModeSelect";
import Responsive from "@/components/common/Responsive";
import ProductFilters from "./ProductFilters";
import ProductFilterProvider from "../ProductFilterSidebar/ProductFilterProvider";
import { ProductFilters as ProductFiltersType } from "@/types";

export default function ProductListHeader({
  total_items,
  filters,
}: {
  total_items: number;
  filters: ProductFiltersType;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-1 gap-2">
      <div className="flex gap-2">
        <ProductSort />

        <Responsive visible="mobile">
          <ProductFilterProvider filters={filters}>
            <ProductFilters total_items={total_items} />
          </ProductFilterProvider>
        </Responsive>
      </div>
      <Responsive visible="mobile">
        <ViewModeSelect />
      </Responsive>

      <p className="text-sm text-muted">
        {total_items.toLocaleString("fa-IR")} کالا
      </p>
    </div>
  );
}
