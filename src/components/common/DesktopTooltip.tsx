"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { ComponentProps, PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  content: string;
  contentProps?: ComponentProps<typeof TooltipContent>;
};

export default function DesktopTooltip({
  content,
  children,
  contentProps,
}: PropsWithChildren<Props>) {
  const isMobile = useIsMobile();
  return isMobile ? (
    children
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...contentProps}>{content}</TooltipContent>
    </Tooltip>
  );
}
