"use client";
import { ticketTopics } from "@/data/tickets";
import { TicketTopic } from "@/types/user";
import React from "react";

type Props = {
  onSelect: (category: TicketTopic) => void;
};

export default function SelectTicketCategory({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {ticketTopics.map((topic) => (
        <div
          key={topic.category}
          onClick={() => onSelect(topic)}
          className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
        >
          {topic.category}
        </div>
      ))}
    </div>
  );
}
