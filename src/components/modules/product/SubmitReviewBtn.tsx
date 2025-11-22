"use client";

import { Button } from "@/components/ui/button";

import React from "react";
import SubmitReviewForm from "./ProductReviewForm";
import BaseDialog from "@/components/common/BaseDialog";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
  Trigger?: React.ReactNode;
};

export default function SubmitReviewBtn({ Trigger, ...props }: Props) {
  return (
    <div>
      <BaseDialog
        title="ثبت دیدگاه"
        hiddenFooter
        trigger={
          Trigger || (
            <Button variant={"outline"} className="w-full">
              ثبت دیدگاه
            </Button>
          )
        }
        content={<SubmitReviewForm {...props} />}
      />
    </div>
  );
}
