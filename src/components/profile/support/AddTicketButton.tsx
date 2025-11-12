"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddTicketForm from "./AddTicketForm";
import SelectTicketCategory from "./SelectTicketCategory";
import { TicketTopic } from "@/types/user";

export default function AddTicketButton() {
  const [category, setCategory] = useState<TicketTopic | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"text"} size={"sm"} startIcon={<Plus />}>
          ثبت درخواست
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>ثبت درخواست پشتیبانی جدید</DialogTitle>
        </DialogHeader>
        {category ? (
          <AddTicketForm category={category} onBack={() => setCategory(null)} />
        ) : (
          <SelectTicketCategory onSelect={setCategory} />
        )}
      </DialogContent>
    </Dialog>
  );
}
