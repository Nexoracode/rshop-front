"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyeIcon } from "lucide-react";
import { RecentView } from "@/types/user";
import Link from "next/link";

export default function RecentViewedCard({
  product: { id, image, name },
}: RecentView) {
  return (
    <Link target="_blank" href={`/p/rsp-${id}`} className="">
      <Card className="group gap-4 flex flex-row sm:flex-col relative overflow-hidden !p-3 hover:shadow-md transition-all">
        {/* تصویر */}
        <div className="aspect-square rounded-md overflow-hidden bg-muted/5 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-cover size-24 sm:size-fit transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          {/* جزئیات */}
          <div className="space-y-1">
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
      </Card>
    </Link>
  );
}
