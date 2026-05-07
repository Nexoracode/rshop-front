"use client";
import { ListLayout } from "@/components/common/ListLayout";
import { getSupportTickets } from "@/queries/profile/support";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TicketCard from "./SupportCard";
import { Skeletons } from "@/components/ui/skeleton";
import AddTicketButton from "./AddTicketButton";
import { Ticket } from "@/types/user";
import ProfileSectionBox from "../ProfileSectionBox";
import EmptyState from "@/components/common/EmptyState";

export default function SupportList() {
  const { data: tickets, isPending } = useQuery(getSupportTickets);

  if (!tickets || isPending) {
    return (
      <ProfileSectionBox
        title="تیکت‌های پشتیبانی"
        navigateElem={<AddTicketButton />}
        className="!min-h-fit"
      >
        <EmptyState
          title="هیچ تیکتی ثبت نشده است"
          description="برای دریافت پشتیبانی سریع‌تر، تیکت خود را ثبت کنید."
          src="/announcements-list-empty.svg"
        />
      </ProfileSectionBox>
    );
  }

  return (
    <ProfileSectionBox
      title="تیکت‌های پشتیبانی"
      navigateElem={<AddTicketButton />}
      className="!min-h-fit"
    >
      <ListLayout<Ticket>
        items={tickets || []}
        renderItem={(ticket) => <TicketCard key={ticket.id} {...ticket} />}
        skeleton={<Skeletons count={3} className="h-12" />}
        className="flex flex-col space-y-3"
        loading={isPending}
      />
    </ProfileSectionBox>
  );
}
