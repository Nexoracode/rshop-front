"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useProductPage } from "../ProductProvider";

export default function DisplayFurtherDescription() {
  const { setOpenDialog } = useProductPage();
  return (
    <div className="flex md:hidden justify-center py-4">
      <Button
        rounded={"full"}
        variant={"fill"}
        color="neutral"
        size={"sm"}
        onClick={() => setOpenDialog(true)}
        endIcon={<ChevronLeft className="size-4" />}
      >
        مشاهده ادامه توضیحات
      </Button>
    </div>
  );
}
