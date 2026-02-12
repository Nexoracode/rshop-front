"use client";

import { useRef, useEffect } from "react";
import ChatMessage from "./SupportMessage";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSupportTicket } from "@/queries/profile/support";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Card } from "@/components/ui/card";
import CloseTicketButton from "./CloseTicketButton";
import { Badge } from "@/components/ui/badge";

export default function SupportPage() {
  const { support_id = null } = useParams();

  const { data: ticket } = useQuery(
    getSupportTicket(support_id as string | null),
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [ticket?.messages]);

  return (
    <Card className=" overflow-hidden">
      <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] w-full mx-auto border rounded-lg overflow-h-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-background">
          <div className="flex items-center gap-3">
            <Image
              src={
                ticket?.product
                  ? ticket.product.image || PRODUCT_PLACEHOLDER
                  : "/support.png"
              }
              className="rounded-lg border bg-neutral-200 p-1"
              width={65}
              height={65}
              alt=""
            />
            <div>
              <p className="font-semibold  text-sm">
                تیکت شماره:{" "}
                <span
                  dir="ltr"
                  className="inline-block"
                >{`#${ticket?.id}`}</span>
              </p>
              <p className="font-semibold text-sm">{ticket?.subject}</p>
            </div>
          </div>
          {ticket?.status === "closed" ? (
            <Badge variant={"warning"}>بسته شده</Badge>
          ) : (
            <CloseTicketButton id={ticket?.id ?? 0} />
          )}
        </div>

        <Separator />

        {/* Chat messages */}
        <ScrollArea ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          {ticket?.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} product={ticket.product} />
          ))}
        </ScrollArea>

        {/* Input */}
        {ticket?.status === "closed" ? null : (
          <div>
            <ChatInput supportId={ticket?.id || 0} />
          </div>
        )}
      </div>
    </Card>
  );
}
