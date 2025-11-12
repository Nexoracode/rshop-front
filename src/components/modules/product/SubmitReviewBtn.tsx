"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import SubmitReviewForm from "./ProductReviewForm";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
  Trigger?: React.ReactNode;
};

export default function SubmitReviewBtn({ Trigger, ...props }: Props) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {Trigger || <Button className="w-full">ثبت دیدگاه</Button>}
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <DialogTitle>ثبت دیدگاه</DialogTitle>
          <SubmitReviewForm {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
