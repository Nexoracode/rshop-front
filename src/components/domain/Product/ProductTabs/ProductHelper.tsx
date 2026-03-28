"use client";
import { ProductHelper as ProductHelperType } from "@/types/product";
import React from "react";

import BaseDialog from "@/components/common/BaseDialog";
import { ChevronLeft } from "lucide-react";
import Image from "@/components/common/Image";

export default function ProductHelper({
  description,
  title,
  image,
}: ProductHelperType) {
  return (
    <BaseDialog
      title={title}
      width="2xl"
      className=""
      trigger={
        <div className="flex -mt-2 items-center border cursor-pointer hover:bg-sky-50 transition-all border-sky-200 text-sky-600 p-3 rounded-lg justify-between">
          راهنمای سایز
          <ChevronLeft size={24} className="text-sky-600" />
        </div>
      }
      content={
        <section className="relative h-96 space-y-4" id="helper">
          <Image
            src={image}
            alt="helper-image"
            fill
            className="p-2 object-contain border rounded-lg bg-slate-100"
          />

          <p className="text-muted text-sm leading-6">{description}</p>
        </section>
      }
    />
  );
}
