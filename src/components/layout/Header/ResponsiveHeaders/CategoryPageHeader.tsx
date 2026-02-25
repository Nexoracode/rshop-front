import React from "react";
import MobileSearchBox from "../SearchBox/MobileSearchBox";
import HeaderCategoryPageTitle from "../HeaderCategoryPageTitle";
import BackButton from "@/components/common/BackButton";
import SharePageLink from "../SharePageLink";

export default function CategoryPageHeader() {
  return (
    <>
      <BackButton />

      <HeaderCategoryPageTitle />

      <MobileSearchBox triggerMode="icon" />
      <SharePageLink />
    </>
  );
}
