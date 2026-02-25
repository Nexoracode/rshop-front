"use client";

import { Button } from "@/components/ui/button";

import React from "react";
import BaseDialog from "@/components/common/BaseDialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import ProductReviewForm from "./ProductReviewForm";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
  Trigger?: React.ReactNode;
};

export default function SubmitReviewBtn({ Trigger, ...props }: Props) {
  const [open, setOpen] = React.useState(false);
  const { user } = useCurrentUser();
  return (
    <div>
      {user ? (
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
          content={<ProductReviewForm {...props} />}
        />
      ) : (
        <>
          <Button
            variant={"outline"}
            onClick={() => setOpen(true)}
            className="w-full"
          >
            ثبت دیدگاه
          </Button>
          <LoginRequiredDialog
            usage="review"
            open={open}
            onOpenChange={setOpen}
          />
        </>
      )}
    </div>
  );
}
