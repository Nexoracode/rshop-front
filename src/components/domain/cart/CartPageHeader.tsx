"use client";

import BackButton from "@/components/common/BackButton";
import Image from "@/components/common/Image";
import React from "react";

export default function CartPageHeader() {
  return (
    <div className="relative w-full flex items-center justify-between border-b border-slate-200 p-3 md:p-6 mb-8 lg:mb-16">
      <div className="bg-slate-100 p-1.5 px-3 rounded-md cursor-pointer flex items-center gap-2">
        <BackButton />
        <span>برگشت</span>
      </div>
      <Image src={"/rshop_logo_h.png"} width={100} height={45} alt="logo" />
      <div className="w-[100px] hidden md:flex"></div>
    </div>
  );
}
