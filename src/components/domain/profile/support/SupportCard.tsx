import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { ticketStatus } from "@/data/tickets";
import { toPersianDateTime } from "@/lib/utils/date-time";
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
    <Link href={`/profile/support/${id}`} className="!p-4 !border-x-0 !rounded-none !border-t-0 border !border-b-1 last:!border-0">
      <Card className="flex relative border-none flex-row !p-0">
        <Image
          src={product ? product.image || PRODUCT_PLACEHOLDER : `/window.svg`}
          alt=""
          className="border p-5 rounded-lg"
          width={72}
          height={72}
        />

        <div className="flex-1 flex justify-between">
          <div>
            <p className="text-sm line-clamp-1 font-medium mb-3">{subject}</p>
            <p className="text-muted/50 text-xs">
              {toPersianDateTime(created_at)}
            </p>
          </div>
          <ChevronLeft />
        </div>

        <Badge
          className="absolute bottom-2 left-2 w-20 rounded-md text-white"
          variant={ticketStatus[status]?.color}
        >
          {ticketStatus[status]?.label}
        </Badge>
      </Card>
    </Link>
  );
}
