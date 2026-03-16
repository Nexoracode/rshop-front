"use client";
import { ProductHelper as ProductHelperType } from "@/types/product";
import Image from "next/image";
import React from "react";
import { Button } from "../../../ui/button";

import BaseDialog from "@/components/common/BaseDialog";
import { ChevronLeft } from "lucide-react";

export default function ProductHelper({
  description,
  title,
  image,
}: ProductHelperType) {
  return (
    <BaseDialog
      title={title}
      width="2xl"
      trigger={
        <div className="flex items-center border cursor-pointer hover:bg-sky-50 transition-all border-sky-200 text-sky-600 p-3 rounded-lg justify-between">
          راهنمای سایز
          <ChevronLeft size={24} className="text-sky-600" />
        </div>
      }
      content={
        <section className="space-y-4" id="helper">
          <div className="relative  w-full aspect-square">
            <Image
              src={image}
              className="p-2 object-contain border rounded-lg"
              fill
              alt=""
            />
          </div>

          <p className="text-muted text-sm leading-6">{description}</p>
        </section>
      }
    />
  );
}
