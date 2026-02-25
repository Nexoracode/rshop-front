import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  icon: LucideIcon;
  label: string;
  description?: string;
};

export default function FaqTitle({ icon: Icon, label, description }: Props) {
  return (
    <div className="flex gap-3 flex-col items-center">
      <span className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
        <Icon className="text-primary-400 size-5" />
      </span>

      <div className="text-lg font-medium">{label}</div>

      {description && (
        <div className="text-muted-light text-xs">{description}</div>
      )}
    </div>
  );
}
