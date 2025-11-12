import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({
  date,
  image,
  slug,
  tiny_desc,
  title,
}: Blog) {
  return (
    <Card style={{ direction: "rtl" }} className="!p-2 gap-0">
      <Link href={"/blog/eeee"} className="relative h-[16rem] ">
        <Image fill alt="" src={image} className="object-fill rounded-xl" />
      </Link>

      <div className="py-5 space-y-2.5  px-4">
        <p className="text-sm font-light text-neutral-400">
          {Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(Date.parse(date))}
        </p>

        <p className="text-foreground font-semibold">{title}</p>

        <p className="text-sm line-clamp-2 text-justify text-neutral-400 font-light mb-0 leading-6">
          {tiny_desc}
        </p>
        <div className="flex justify-end mt-5">
          <Link href={slug}>
            <Button className="rounded-full">مطالعه مقاله</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
