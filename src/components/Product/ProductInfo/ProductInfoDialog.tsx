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
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="relative">
          <Tabs defaultValue="description">
            <TabsList className="sticky w-full top-0">
              {tabs.map((tab) => (
                <TabsTrigger value={tab.key} key={tab.key}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description">
              <ProductDescription description={description} />
            </TabsContent>
            <TabsContent value="specifications">
              <ProductAttributes attributes={specifications} />
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
