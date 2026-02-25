import React from "react";
import CartIconLink from "../CartIconLink";
import BackButton from "@/components/common/BackButton";
import MobileSearchBox from "../SearchBox/MobileSearchBox";

export default function ProductPageHeader() {
  return (
    <>
      <BackButton />

      <MobileSearchBox triggerMode="icon" />

      <CartIconLink />
    </>
  );
}
