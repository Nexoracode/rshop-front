"use client";
import { Button } from "@/components/ui/button";
import { useViewMode } from "@/hooks/useViewMode";
import { cn } from "@/lib/utils";
import { Grid2X2, List } from "lucide-react";
import React from "react";

export default function ViewModeSelect() {
  const { viewMode } = useViewMode();
  return (
    <div className="ml-1 gap-1 flex overflow-hidden">
      <Button
        className={cn(
          "bg-white border hover:bg-white text-neutral-500",
          viewMode === "grid" && "text-secondary-500"
        )}
        size="icon"
        color="neutral"
        //    onClick={() => setViewMode("grid")}
      >
        <Grid2X2 size={24} />
      </Button>
      <Button
        className={cn(
          "bg-white border hover:bg-white text-neutral-500",
          viewMode === "list" && "text-secondary-500"
        )}
        color={"neutral"}
        size="icon"
        //       onClick={() => setViewMode("list")}
      >
        <List size={24} />
      </Button>
    </div>
  );
}
