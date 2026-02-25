import Image from "@/components/common/Image";
import { brand } from "@/data/footer";
import Link from "next/link";
import React from "react";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      {brand.logoSrc ? (
        <Link
          href={brand.href ?? "/"}
          className="relative block h-12 w-20 shrink-0"
        >
          <Image
            src={brand.logoSrc}
            alt={brand.name}
            fill
            className="rounded-md object-contain"
            sizes="180px"
          />
        </Link>
      ) : null}
      <Link
        href={brand.href ?? "/"}
        className="text-base font-semibold hover:underline"
      >
        {brand.name}
      </Link>
    </div>
  );
}
