import React from "react";
import MobileSearchBox from "../SearchBox/MobileSearchBox";
import HeaderCategoryPageTitle from "../HeaderCategoryPageTitle";
import BackButton from "@/components/common/BackButton";
import SharePageLink from "../SharePageLink";

export default function CategoryPageHeader({
  pathname,
}: {
  pathname: boolean;
}) {
  return (
    <>
      <BackButton />

      {pathname ? (
        <HeaderCategoryPageTitle />
      ) : (
        <div className="flex-1 text-sm font-medium">
          <p>محصولات</p>
        </div>
      )}

      <div className="flex items-center">
        <MobileSearchBox triggerMode="icon" />

        <SharePageLink />
      </div>
    </>
  );
}
