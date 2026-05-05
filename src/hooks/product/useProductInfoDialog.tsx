"use client";
import { useProductPage } from "@/queries/products/product-page";

export default function useProductInfoDialog() {
  const { pageData, setPageData } = useProductPage();

  const openDialog = (infoTab: string) => {
    setPageData({ activeTab: infoTab });
  };
  const closeDialog = () => {
    setPageData({ activeTab: null });
  };

  return { openDialog, closeDialog, activeTab: pageData.activeTab };
}
