import React from "react";
import MobileSearchBox from "../SearchBox/MobileSearchBox";
import HeaderCategoryPageTitle from "./CategoryPageTitle";
import BackButton from "@/components/common/BackButton";
import SharePageLink from "../SharePageLink";
import BrandPageTitle from "./BrandPageTitle";
import CategoryPageTitle from "./CategoryPageTitle";

export default function ProductsListPageHeader({
  isBrandPage,
  isCategoryPage,
  isShopPage,
}: {
  isCategoryPage: boolean;
  isBrandPage: boolean;
  isShopPage: boolean;
}) {
  const getPageTitle = () => {
    if (isBrandPage) return <BrandPageTitle />;

    if (isShopPage)
      return (
        <div className="flex-1 text-sm font-medium">
          <p>محصولات</p>
        </div>
      );

    return <CategoryPageTitle />;
  };
  return (
    <>
      <BackButton />

      {getPageTitle()}

      <div className="flex items-center">
        <MobileSearchBox triggerMode="icon" />

        <SharePageLink />
      </div>
    </>
  );
}
