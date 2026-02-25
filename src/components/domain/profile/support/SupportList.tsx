"use client";
import { ListLayout } from "@/components/common/ListLayout";
import { getSupportTickets } from "@/queries/profile/support";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TicketCard from "./SupportCard";
import { Skeletons } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import AddTicketButton from "./AddTicketButton";
import { Ticket } from "@/types/user";

export default function SupportList() {
  const { data: tickets, isPending } = useQuery(getSupportTickets);
  return (
    <Card>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold mb-4">تیکت‌های پشتیبانی</h1>
        <AddTicketButton />
      </div>
      <ListLayout<Ticket>
        items={tickets || []}
        renderItem={(ticket) => <TicketCard key={ticket.id} {...ticket} />}
        skeleton={<Skeletons count={3} className="h-12" />}
        className="flex flex-col space-y-2"
        loading={isPending}
      />
    </Card>
  );
}
