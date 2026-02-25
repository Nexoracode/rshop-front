import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LucideIcon } from "lucide-react";
import React from "react";
import TriggerButton from "./TriggerButton";

type Props = {
  label: string;
  modalLabel: string;
  content: React.ReactNode;
  Icon?: LucideIcon;
  chevren?: boolean;
  isActive?: boolean;
};

export default function FilterSheet({
  label,
  content,
  Icon,
  modalLabel,
  chevren,
  isActive,
}: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <TriggerButton
          label={label}
          Icon={Icon}
          chevren={chevren}
          isActive={isActive}
        />
      </DrawerTrigger>
      <DrawerContent title={modalLabel}>{content}</DrawerContent>
    </Drawer>
  );
}
