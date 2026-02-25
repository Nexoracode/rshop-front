import React from "react";
import LogoLink from "../LogoLink";
import MobileSearchBox from "../SearchBox/MobileSearchBox";

export default function HomePageHeader() {
  return (
    <>
      <LogoLink />

      <MobileSearchBox triggerMode="button" />
    </>
  );
}
