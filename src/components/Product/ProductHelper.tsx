"use client";
import { ProductHelper as ProductHelperType } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

export default function ProductHelper({
  description,
  title,
  image,
}: ProductHelperType) {
  return (
    <section className="space-y-4" id="helper">
      <SectionTitle title={title} />
      <HelperImage src={image} />

      <p className="text-muted text-sm leading-6">{description}</p>
    </section>
  );
}

function HelperImage({ src }: { src: string }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="relative w-full max-w-lg aspect-square">
        <Image src={src} fill alt="" />

        <Button variant={"text-nohover"} onClick={() => setOpen(true)}>
          <Search />
        </Button>
      </div>
      {open && (
        <div className="fixed w-screen flex justify-center items-center z-50 h-screen bg-black/30 top-0 right-0">
          <div className="relative mx-auto flex justify-center items-center w-full max-w-xl aspect-square">
            <Button
              variant={"text-nohover"}
              size={"sm"}
              color="danger"
              rounded={"full"}
              className="absolute bg-neutral-200 hover:bg-neutral-300 top-2 left-2 z-20"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
            <Image src={src} fill alt="" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
