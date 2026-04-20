"use client";

import Image from "next/image";
import { RecentView } from "@/types/user";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export default function RecentViewedCard({
  product: { id, image, name },
}: RecentView) {
  return (
    <Link
      target="_blank"
      className={`flex flex-col bg-white !h-[254px] select-none`}
      href={`/p/rsp-${id}`}
    >
      {/* image */}
      <div className="relative mt-2 bg-white w-full flex items-center justify-center">
        <Image
          src={image || PRODUCT_PLACEHOLDER}
          alt={name}
          width={132}
          height={132}
          className="w-[132px] h-[132px] object-cover rounded-lg"
        />
      </div>

      {/* content */}
      <div className="mt-4 flex-1 justify-between flex flex-col px-2 pb-3">
        <h3 className="line-clamp-2 text-[13px] font-medium px-2 text-gray-600">
          {name}
        </h3>

        <div className="flex items-center justify-center">
          <Button
            startIcon={<EyeIcon className="w-4 h-4 ml-1" />}
            size="sm"
            href={`/p/rsp-${id}`}
            variant={"outline"}
            className="text-[13px]"
          >
            مشاهده محصول
          </Button>
        </div>
      </div>
    </Link>
  );
}
