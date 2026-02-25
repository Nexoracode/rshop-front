"use client";
import { ProductHelper as ProductHelperType } from "@/types/product";
import Image from "next/image";
import React from "react";
import { Button } from "../../../ui/button";

import BaseDialog from "@/components/common/BaseDialog";

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
        <Button className="px-0" variant={"text-nohover"}>
          راهنمای سایز
        </Button>
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
