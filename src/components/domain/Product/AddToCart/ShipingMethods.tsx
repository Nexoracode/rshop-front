"use client";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Package2Icon, Truck, TruckIcon } from "lucide-react";
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
            <span className="w-full flex justify-between items-center gap-1">
              <TruckIcon className="size-5 text-slate-600" />
              <span className="text-sm inline-block text-right flex-1 ps-1 text-muted">
                ارسال
              </span>
              <span className="flex gap-2 relative ps-4 items-center text-[13px] text-primary-500">
                فروشگاه آرشاپ
              </span>
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
                <Truck className="inline-block text-slate-600 ml-1 size-6" />
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
