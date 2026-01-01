"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatToman, toPersainDate } from "@/lib/utils";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import Link from "next/link";
import { ChevronLeftIcon, NotepadTextDashed } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { statusColor, statusLabel } from "@/data/order";
import { Order } from "@/types/order";

export function OrderCard({ order }: { order: Order }) {
  return (
    <Link href={`/profile/orders/${order.id}`}>
      <Card className="flex flex-col gap-4 hover:shadow-md transition-all">
        <div className="flex justify-between items-center">
          <Badge variant={statusColor[order.status]}>
            {statusLabel[order.status]}
          </Badge>

          <ChevronLeftIcon className="size-6" />
        </div>

        <div className="flex flex-nowrap text-nowrap">
          <p className="text-xs md:text-sm text-muted/50">
            {toPersainDate(order.created_at)}
          </p>

          <p className="text-3xl text-muted/30 font-semibold mx-2 leading-2">
            .
          </p>
          <div className="flex items-center">
            <p className="text-xs md:text-sm text-muted/60">شماره سفارش: </p>
            <p className="text-xs md:text-sm pr-1">{order.id}</p>
          </div>

          <p className="text-3xl text-muted/30 font-semibold mx-2 leading-2">
            .
          </p>
          <div className="text-right flex items-center">
            <p className="text-xs md:text-sm text-muted/60">مبلغ کل: </p>
            <p className="font-semibold text-sm md:text-[1rem] text-primary pr-1">
              {formatToman(+order.total)}
            </p>
          </div>
        </div>

        <Separator />
        <div className="">
          {order.items.map((item) => (
            <Image
              key={item.id}
              src={item.product.image || PRODUCT_PLACEHOLDER}
              alt={item.product.name}
              width={86}
              height={86}
              className="inline-block rounded-md border object-cover ml-1"
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
          <>
            <Separator />

            <div className="flex justify-end">
              <Button
                variant="fill"
                size={"md"}
                className="w-full md:w-[8rem]"
                href={`/checkout/payment/${order.id}`}
              >
                پرداخت
              </Button>
            </div>
          </>
        )}
      </Card>
    </Link>
  );
}
