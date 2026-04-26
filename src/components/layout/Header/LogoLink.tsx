"use client"

import Image from "@/components/common/Image";
import Link from "next/link";
import React from "react";

export default function LogoLink() {
  return (
    <Link
      href="/"
      className="text-2xl w-20 aspect-[80/40] relative inline-block font-bold"
    >
      <Image
        fill
        sizes="80px"
        className="size-16"
        alt="فروشگاه آکادمی روح بخش"
        src={"/rshop_logo_h.png"}
      />
    </Link>
  );
}
