"use client";

import React from "react";
import ProductSort from "./ProductSort";
import ViewModeSelect from "./ViewModeSelect";
import Responsive from "@/components/common/Responsive";
import ProductFilters from "./ProductFilters";

export default function ProductListHeader() {
  return (
    <div className="flex items-center justify-between border-b pb-1 gap-2">
      <div className="flex gap-2">
        <ProductSort />

        <Responsive visible="mobile">
          <ProductFilters />
        </Responsive>
      </div>

      <ViewModeSelect />
    </div>
  );
}
