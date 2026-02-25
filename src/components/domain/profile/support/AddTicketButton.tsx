"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddTicketForm from "./AddTicketForm";
import SelectTicketCategory from "./SelectTicketCategory";
import { TicketTopic } from "@/types/user";
import BaseDialog from "@/components/common/BaseDialog";

export default function AddTicketButton() {
  const [category, setCategory] = useState<TicketTopic | null>(null);
  return (
    <BaseDialog
      content={
        category ? (
          <AddTicketForm category={category} onBack={() => setCategory(null)} />
        ) : (
          <SelectTicketCategory onSelect={setCategory} />
        )
      }
      title="ثبت درخواست پشتیبانی جدید"
      trigger={
        <Button variant={"text"} size={"sm"} startIcon={<Plus />}>
          ثبت درخواست
        </Button>
      }
      hiddenFooter
    />
  );
}
