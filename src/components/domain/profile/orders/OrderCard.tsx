"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import Link from "next/link";
import { ChevronLeftIcon, NotepadTextDashed } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { statusColor, statusLabel } from "@/data/order";
import { Order } from "@/types/order";
import { toPersianDate } from "@/lib/utils/date-time";
import { formatToman } from "@/lib/utils/price";

export function OrderCard({ order }: { order: Order }) {
  return (
    <Link href={`/profile/orders/${order.id}`}>
      <div className="flex flex-col gap-4 hover:shadow-md transition-all p-4 rounded-lg border">
        <div className="flex justify-between items-center pb-2">
          <Badge
            variant={statusColor[order.status]}
            className="text-white rounded-md"
          >
            {statusLabel[order.status]}
          </Badge>

          <ChevronLeftIcon className="size-6 text-gray-600" />
        </div>
        <div className="flex flex-wrap text-nowrap border-b pb-3 space-y-4">
          <p className="text-xs md:text-sm text-muted/50">
            {toPersianDate(order.created_at)}
          </p>

          <p className="text-3xl text-muted/30 font-medium mx-2 leading-2">.</p>
          <div className="flex items-center">
            <p className="text-xs md:text-sm text-muted/60">شماره سفارش: </p>
            <p className="text-xs md:text-sm pr-1">{order.id}</p>
          </div>

          <p className="text-3xl text-muted/30 font-medium mx-2 leading-2">.</p>
          <div className="text-right flex items-center">
            <p className="text-xs md:text-sm text-muted/60">مبلغ کل: </p>
            <p className="font-medium text-sm md:text-[1rem] text-primary pr-1">
              {formatToman(+order.total)}
            </p>
          </div>
        </div>
        <div>
          {order.items.map((item) => (
            <Image
              key={item.id}
              src={item.product.image || PRODUCT_PLACEHOLDER}
              alt={item.product.name}
              width={86}
              height={86}
              className="inline-block rounded-md aspect-square object-cover ml-1"
            />
          ))}
        </div>
        {order.status === "preparing" ||
          (order.status === "delivered" && (
            <>
              <Separator />

              <div className="flex justify-end">
                <Button
                  startIcon={<NotepadTextDashed className="size-6" />}
                  variant="text"
                  size={"sm"}
                  href={`/invoice/${order.id}`}
                  target="_blank"
                >
                  مشاهده فاکتور
                </Button>
              </div>
            </>
          ))}
        {order.status === "awaiting_payment" && (
          <div className="flex items-center justify-between">
            <Button
              variant="fill"
              size={"md"}
              className="w-full md:w-[8rem]"
              href={`/checkout/payment/${order.id}`}
            >
              پرداخت
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}
