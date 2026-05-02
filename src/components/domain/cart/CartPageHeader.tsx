"use client";

import BackButton from "@/components/common/BackButton";
import Image from "@/components/common/Image";
import Link from "next/link";
import React from "react";

export default function CartPageHeader({
  backLink,
  hiddenBack,
}: {
  backLink?: string;
  hiddenBack?: boolean;
}) {
  return (
    <div className="relative w-full flex items-center justify-between border-b border-slate-200 p-3 md:p-6 mb-8 lg:mb-16">
      {!hiddenBack ? (
        <BackButton
          link={backLink}
          className="bg-slate-100 p-1.5 px-3 rounded-md"
        >
          <span>برگشت</span>
        </BackButton>
      ) : (
        <div></div>
      )}
      <Link href="/">
        <Image src={"/rshop_logo_h.png"} width={100} height={45} alt="logo" />
      </Link>
      <div className="w-[100px] hidden md:flex"></div>
    </div>
  );
}
