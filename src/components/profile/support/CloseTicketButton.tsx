"use client";
import { Button } from "@/components/ui/button";
import { closeSupportTicket } from "@/queries/support";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type Props = {
  id: number;
};

export default function CloseTicketButton({ id }: Props) {
  const { mutate } = useMutation(closeSupportTicket);
  const handleClose = () => {
    mutate(id);
  };
  return (
    <Button onClick={handleClose} variant="text" size="sm">
      پایان گفتگو
    </Button>
  );
}
