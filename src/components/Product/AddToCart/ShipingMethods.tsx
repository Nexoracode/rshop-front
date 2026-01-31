"use client";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Truck, TruckElectric } from "lucide-react";
import React, { useState } from "react";

export default function ShipingMethods() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BaseDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button
            onClick={() => setOpen(true)}
            className="flex w-full justify-between items-center"
          >
            <TruckElectric className="text-primary" />
            <span className="text-sm inline-block  text-right flex-1 ps-1 text-muted">
              روش های ارسال
            </span>
            <ChevronLeft className="text-muted-light size-6" />
          </button>
        }
        title="روش ها و هزینه های ارسال"
        footer={
          <Button
            onClick={() => setOpen(false)}
            fullWidth
            variant={"fill"}
            color="neutral"
            size={"lg"}
          >
            فهمیدم
          </Button>
        }
        content={
          <div>
            <div>
              <p className="font-medium">
                <Truck className="inline-block text-primary ml-1 size-6" />
                توسط آرشاپ
              </p>
              <p className="text-muted-light mt-2 leading-8 text-sm">
                این کالا در انبار آرشاپ موجود و آماده پردازش است و توسط پست در
                اسرع وقت ارسال خواهد شد.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
