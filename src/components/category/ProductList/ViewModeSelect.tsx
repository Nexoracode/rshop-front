"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid2X2, List } from "lucide-react";
import React from "react";
import { useProductList } from "../ProductListProvider";

export default function ViewModeSelect() {
  const { view, setView } = useProductList();
  return (
    <div className="ml-1 gap-1 flex overflow-hidden">
      <Button
        className={cn(
          "bg-white border hover:bg-white text-neutral-500",
          view === "grid" && "text-secondary-500"
        )}
        size="icon"
        color="neutral"
        onClick={() => setView("grid")}
      >
        <Grid2X2 size={24} />
      </Button>
      <Button
        className={cn(
          "bg-white border hover:bg-white text-neutral-500",
          view === "list" && "text-secondary-500"
        )}
        color={"neutral"}
        size="icon"
        onClick={() => setView("list")}
      >
        <List size={24} />
      </Button>
    </div>
  );
}
