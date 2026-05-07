import { Badge } from "@/components/ui/badge";
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
    <Link href={`/profile/support/${id}`} className="border-t first:border-t-0">
      <div className="flex relative border-none flex-row !p-0">
        <Image
          src={product ? product.image || PRODUCT_PLACEHOLDER : `/window.svg`}
          alt=""
          className="border p-3 rounded-lg"
          width={72}
          height={72}
        />

        <div className="flex-1 ps-2 flex gap-1 flex-col justify-between">
          <p className="text-sm line-clamp-1 font-medium">{subject}</p>
          <p className="text-muted/50 text-xs">
            {toPersianDateTime(created_at)}
          </p>
          <div className="flex items-center justify-between">
            <Badge
              className="p-0.5 md:p-1 md:px-3 leading-3 bottom-2 left-2 rounded-md text-white"
              variant={ticketStatus[status]?.color}
            >
              {ticketStatus[status]?.label}
            </Badge>
            <ChevronLeft size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
