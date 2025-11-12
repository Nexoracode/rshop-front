import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import React from "react";
import FilterByCategory from "../ProductFilterSidebar/FilterByCategory";
import FiltersList from "../ProductFilterSidebar/FiltersList";

export default function ProductFilters() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button
            size={"sm"}
            variant={"outline"}
            color="neutral"
            rounded={"full"}
            startIcon={<SlidersHorizontal size={14} />}
          >
            فیلتر
          </Button>
        </SheetTrigger>

        <SheetContent className="p-3 min-h-screen" side="bottom" hiddenClose>
          <SheetClose asChild className="w-fit">
            <Button startIcon={<ArrowRight />} variant={"text"} color="neutral">
              بستن
            </Button>
          </SheetClose>

          <div>
            <FilterByCategory />

            <FiltersList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
