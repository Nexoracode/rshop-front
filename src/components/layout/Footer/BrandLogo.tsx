import Image from "@/components/common/Image";
import Link from "@/components/shared/Link";
import React from "react";

export default function BrandLogo() {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link href={"/"} className="relative block h-12 w-20 shrink-0">
        <Image
          src={"/rshop_logo_h.png"}
          alt={"برند فروشگاه"}
          fill
          className="rounded-md object-contain"
          sizes="180px"
        />
      </Link>
    </div>
  );
}
