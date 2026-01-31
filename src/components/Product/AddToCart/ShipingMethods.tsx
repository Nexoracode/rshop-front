"use client";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Package2Icon,
  Truck,
  TruckElectric,
  TruckIcon,
} from "lucide-react";
import React, { useState } from "react";

export default function ShipingMethods() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BaseDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button onClick={() => setOpen(true)} className="w-full">
            <span className="w-full flex justify-between items-center">
              <Package2Icon className="text-primary" />
              <span className="text-sm inline-block  text-right flex-1 ps-1 text-muted">
                روش های ارسال
              </span>
              <ChevronLeft className="text-muted-light size-6" />
            </span>

            <span className="flex gap-2 relative pt-4 ps-4 items-center text-xs text-muted-light font-light">
              <span className="absolute right-0.5 top-1.5 bg-gradient-to-b to-primary-100 from-white h-3 w-0.5"></span>
              <span className="absolute w-1.5 h-1.5 top-5 right-0 bg-primary rounded-full"></span>
              <TruckIcon className="size-4 text-danger" />
              توسط آرشاپ
            </span>
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
