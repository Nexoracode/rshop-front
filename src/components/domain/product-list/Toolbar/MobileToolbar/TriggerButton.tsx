// 1. فایل TriggerButton شما (کمی اصلاح شده برای سازگاری بهتر)
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/classnames";
import { ChevronDownIcon, LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";

type TriggerButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  label: string;
  Icon?: LucideIcon;
  chevren?: boolean;
  isActive?: boolean;
  displayBadge?: number;
};

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  (
    {
      label,
      Icon,
      className,
      chevren = false,
      isActive = false,
      displayBadge = 0,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="sm"
        className={cn(
          "px-2 relative gap-1 h-7 leading-0 text-xs text-muted border-muted-light font-normal rounded-full",
          isActive && "bg-success-200 border-success-200 text-success-600",
          className,
        )}
        {...props}
        startIcon={Icon ? <Icon className="size-4" /> : undefined}
        endIcon={chevren ? <ChevronDownIcon className="size-4" /> : null}
      >
        {label}
        {displayBadge > 0 && (
          <span className="w-4 h-4 text-xs z-30 inline-block rounded-full text-white bg-success-600 absolute -top-1 -left-1">
            {displayBadge}
          </span>
        )}
      </Button>
    );
  },
);

TriggerButton.displayName = "TriggerButton";

export default TriggerButton;
