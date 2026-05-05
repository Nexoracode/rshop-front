"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import useProductInfoDialog from "@/hooks/product/useProductInfoDialog";

export default function MoreProductAttribute() {
  const { openDialog } = useProductInfoDialog();
  return (
    <div className="flex md:hidden justify-center py-4">
      <Button
        rounded={"full"}
        variant={"fill"}
        color="neutral"
        size={"sm"}
        onClick={() => openDialog("specifications")}
        endIcon={<ChevronLeft className="size-4" />}
      >
        مشاهده ادامه مشخصات
      </Button>
    </div>
  );
}
