import React from "react";
import MobileSearchBox from "../SearchBox/MobileSearchBox";
import HeaderCategoryPageTitle from "../HeaderCategoryPageTitle";
import BackButton from "@/components/common/BackButton";
import SharePageLink from "../SharePageLink";

export default function CategoryPageHeader({
  isMobileCategoryPage,
}: {
  isMobileCategoryPage: boolean;
}) {
  return (
    <>
      <BackButton />

      {isMobileCategoryPage ? (
        <HeaderCategoryPageTitle />
      ) : (
        <div className="flex-1 text-sm font-medium">
          <p>محصولات</p>
        </div>
      )}

      <MobileSearchBox triggerMode="icon" />

      <SharePageLink />
    </>
  );
}
