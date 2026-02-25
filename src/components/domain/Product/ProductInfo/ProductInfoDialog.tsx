"use client";
import React from "react";
import { Product } from "@/types/product";
import ProductAttributes from "../ProductAttributes";
import ProductDescription from "../ProductTabs/ProductDescription";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProductInfoDialog from "@/hooks/product/useProductInfoDialog";

type TabKey = "description" | "specifications" | "reviews";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "ویژگی‌ها" },
  { key: "reviews", label: "دیدگاه‌ها" },
];

export default function ProductInfoDialog({
  specifications,
  description,
}: Product) {
  const { openTab, closeDialog } = useProductInfoDialog();
  return (
    <Drawer open={!!openTab} onClose={() => closeDialog()}>
      <DrawerContent title="معرفی و مشخصات مصول">
        <div className="relative">
          <Tabs defaultValue={openTab ?? ""}>
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
