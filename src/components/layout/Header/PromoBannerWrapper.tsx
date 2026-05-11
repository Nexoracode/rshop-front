"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = {
  showPromoBanner: boolean;
} & PropsWithChildren;

export default function PromoBannerWrapper({
  showPromoBanner,
  children,
}: Props) {
  const pathName = usePathname();
  const mobileScreeen = useIsMobile();
  const isMobile = mobileScreeen === true;
  const isMobileCategoryPage = isMobile && pathName.includes("/products");
  const isCategoriesListInMobile = isMobile && pathName.includes("/categories");
  return (
    !isMobileCategoryPage &&
    !isCategoriesListInMobile &&
    showPromoBanner &&
    children
  );
}
