"use client";
import React from "react";
import { useProductPage } from "../ProductProvider";
import { Product } from "@/types/product";
import ProductAttributes from "../ProductAttributes";
import ProductDescription from "../ProductTabs/ProductDescription";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabKey = "desc" | "spec" | "rev" | "he";

const tabs: { key: TabKey; label: string }[] = [
  { key: "desc", label: "توضیحات" },
  { key: "spec", label: "ویژگی‌ها" },
  { key: "rev", label: "دیدگاه‌ها" },
  { key: "he", label: "راهنمای سایز" },
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

              <p className="text-lg font-semibold py-6">اینجا آخر محتوا است</p>
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
