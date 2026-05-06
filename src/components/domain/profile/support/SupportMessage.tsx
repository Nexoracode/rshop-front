"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import useCurrentUser from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils/classnames";
import { toPersianDateTime } from "@/lib/utils/date-time";
import { formatToman } from "@/lib/utils/price";
import { Ticket, TicketMessage } from "@/types/user";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  message: TicketMessage;
  product: Ticket["product"];
};

export default function SupportMessage({ message, product }: Props) {
  const user = useCurrentUser();
  const isUser = message.sender.id === user.user?.id;

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-2 md:p-4 text-sm",
          isUser
            ? "bg-neutral-100 text-foreground rounded-br-none"
            : "bg-primary text-primary-foreground rounded-bl-none",
        )}
      >
        {message.content === "product_supprot_message_placeholder" ? (
          <div
            dir="rtl"
            className="flex justify-start bg-neutral-50 rounded-md p-1"
          >
            <Image
              src={product?.image ?? PRODUCT_PLACEHOLDER}
              width={65}
              className="rounded-lg border bg-neutral-100 p-0.5"
              height={65}
              alt=""
            />
            <div className="flex-1 flex flex-col justify-between px-2">
              <p className="text-sm font-medium">{product?.title}</p>
              <div className="flex items-center justify-between">
                <Button size={"icon"} href={`/p/rsp-${product?.id}`}>
                  <PlusIcon className="size-5" />
                </Button>
                <p className="text-sm font-normal text-muted/70">
                  {formatToman(Number(product?.price) ?? 0)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="leading-relaxed">{message.content}</p>
        )}
        <span
          style={{ direction: "rtl" }}
          className="text-[10px]  block mt-1 opacity-60"
        >
          {toPersianDateTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}
