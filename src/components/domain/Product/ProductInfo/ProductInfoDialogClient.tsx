"use client";
import React from "react";
import { Product } from "@/types/product";
import ProductDescription from "../ProductTabs/ProductDescription";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProductInfoDialog from "@/hooks/product/useProductInfoDialog";
import ProductAttributeGroup from "../ProductAttributes/ProductAttributeGroup";

type TabKey = "description" | "specifications" | "reviews";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "جدول مشخصات" },
];

export default function ProductInfoDialogClient({
  specifications,
  description,
}: Product) {
  const { activeTab, closeDialog } = useProductInfoDialog();

  const open =
    activeTab !== null &&
    ["specifications", "description"]?.includes(activeTab);
  return (
    <Drawer open={open} onClose={closeDialog}>
      <DrawerContent title="توضیحات و مشخصات محصول">
        <div className="relative">
          <Tabs defaultValue={activeTab ?? ""}>
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
              <div className="">
                {specifications
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((attrGroup) => (
                    <ProductAttributeGroup key={attrGroup.id} {...attrGroup} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
