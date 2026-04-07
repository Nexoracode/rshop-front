import BackButton from "@/components/common/BackButton";
import Image from "@/components/common/Image";
import Link from "next/link";
import React from "react";

export default function CartPageHeader() {
  return (
    <div className="fixed bg-white top-0 right-0 left-0 md:hidden p-3 w-full border-b flex justify-between items-center">
      <div className="flex  items-center">
        <BackButton />
        <div className="text-sm ms-1">سبد خرید</div>
      </div>

      <Link className="inline-block" href={"/"}>
        <Image
          priority
          width={80}
          height={50}
          src={"/rshop_logo_h.png"}
          alt=""
        />
      </Link>
    </div>
  );
}
