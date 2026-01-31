import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { ticketStatus } from "@/data/tickets";
import { toPersainDateTime } from "@/lib/utils";
import { Ticket } from "@/types/user";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {} & Ticket;

export default function SupportCard({
  product,
  subject,
  status,
  created_at,
  id,
}: Props) {
  return (
    <Link href={`/profile/support/${id}`}>
      <Card className="flex relative !p-2 flex-row">
        <Image
          src={product ? product.image || PRODUCT_PLACEHOLDER : `/window.svg`}
          alt=""
          className="border p-1 rounded-md"
          width={72}
          height={72}
        />

        <div className="flex-1 flex justify-between">
          <div>
            <p className="text-sm line-clamp-1 font-medium mb-3">{subject}</p>
            <p className="text-muted/50 text-xs">
              {toPersainDateTime(created_at)}
            </p>
          </div>
          <ChevronLeft />
        </div>

        <Badge
          className="absolute bottom-2 left-2 w-20"
          variant={ticketStatus[status]?.color}
        >
          {ticketStatus[status]?.label}
        </Badge>
      </Card>
    </Link>
  );
}
