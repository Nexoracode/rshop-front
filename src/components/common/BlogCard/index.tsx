import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({ date, image, tiny_desc, title }: Blog) {
  return (
    <Card style={{ direction: "rtl" }} className="!p-0 gap-1">
      <Link href={"/blog/eeee"} className="relative w-full aspect-[4/3]">
        <Image fill alt="" src={image} className="object-fill rounded-t-xl" />
      </Link>

      <div className="space-y-1 px-2  lg:px-4">
        <p className="text-xs lg:text-sm font-normal text-neutral-400">
          {Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(Date.parse(date))}
        </p>

        <p className="text-foreground text-sm lg:text-base font-medium">
          {title}
        </p>

        <p className="text-xs lg:text-sm line-clamp-2 text-justify text-neutral-400 font-normal mb-0 leading-6">
          {tiny_desc}
        </p>
        <div className="flex justify-end my-2">
          <Button
            className="px-0"
            size={"sm"}
            endIcon={<ChevronLeft className="size-4" />}
            color="info"
            variant={"text"}
          >
            مطالعه مقاله
          </Button>
        </div>
      </div>
    </Card>
  );
}
