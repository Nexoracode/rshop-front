"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import FilterByCategory from "./FilterByCategory";
import FiltersList from "./FiltersList";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProductFilterSidebar() {
  const isMobile = useIsMobile();
  return isMobile ? null : (
    <aside className="w-full md:w-[300px] space-y-5">
      <Card className="px-3">
        <FilterByCategory />
      </Card>

      <Card className="px-3">
        <FiltersList />
      </Card>
    </aside>
  );
}
