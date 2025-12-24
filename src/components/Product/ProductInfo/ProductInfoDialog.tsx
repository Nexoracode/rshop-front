"use client";
import React from "react";
import { useProductPage } from "../ProductProvider";
import { Product } from "@/types/product";

import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import ProductAttributes from "../ProductAttributes";
import ProductDescription from "../ProductTabs/ProductDescription";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type TabKey = "description" | "specifications" | "reviews" | "helper";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "ویژگی‌ها" },
  { key: "reviews", label: "دیدگاه‌ها" },
  { key: "helper", label: "راهنمای سایز" },
];

export default function ProductInfoDialog({
  specifications,
  description,
}: Product) {
  const { openDialog, setOpenDialog } = useProductPage();
  return (
    <Drawer open={openDialog} onClose={() => setOpenDialog(false)}>
      <DrawerContent
        onClose={() => setOpenDialog(false)}
        title="معرفی و مشخصات مصول"
      >
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
