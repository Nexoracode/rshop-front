"use client";
import Image from "@/components/common/Image";
import LoaderDots from "@/components/common/LoaderDots";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";

type Props = {
  open: boolean;
};

export default function TransferToGate({ open }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="w-full max-w-sm">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="w-full py-6 space-y-5 flex flex-col items-center justify-center">
          <Image
            priority
            width={120}
            height={120}
            src={"/rshop_logo_h.png"}
            alt=""
          />
          <p className="text-2xl text-primary text-center">
            در حال انتقال به درگاه
          </p>

          <LoaderDots
            size={10}
            className="inline-block text-primary-500 w-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
