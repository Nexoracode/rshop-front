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
      className=""
      trigger={
        <div className="flex -mt-2 items-center border cursor-pointer hover:bg-sky-50 transition-all border-sky-200 text-sky-600 p-3 rounded-lg justify-between">
          راهنمای سایز
          <ChevronLeft size={24} className="text-sky-600" />
        </div>
      }
      content={
        <section className="space-y-4" id="helper">
          <img
            src={image}
            alt="helper-image"
            className="p-2 object-contain border rounded-lg h-96 bg-slate-100"
          />

          <p className="text-muted text-sm leading-6">{description}</p>
        </section>
      }
    />
  );
}
