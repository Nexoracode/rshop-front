"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { RecentView } from "@/types/user";
import Link from "next/link";

export default function RecentViewedCard({
  product: { id, image, name },
}: RecentView) {
  return (
    <Link target="_blank" href={`/p/rsp-${id}`}>
      <div className="group p-2 md:p-4">
        <div className="aspect-square relative rounded-md overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          {/* جزئیات */}
          <div className="space-y-1 mt-3">
            <p className="text-sm font-medium line-clamp-1">{name}</p>
          </div>

          {/* اکشن‌ها */}
          <Button
            startIcon={<EyeIcon className="w-4 h-4 ml-1" />}
            size="sm"
            fullWidth
            href={`/p/rsp-${id}`}
            variant={"outline"}
          >
            مشاهده محصول
          </Button>
        </div>
      </div>
    </Link>
  );
}
