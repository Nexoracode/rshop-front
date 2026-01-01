"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { ComponentProps, PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  content: string;
  contentProps?: ComponentProps<typeof TooltipContent>;
};

export const DesktopTooltip = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<Props>
>(function DesktopTooltip({ content, children, contentProps }, ref) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipContent ref={ref} {...contentProps}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
});

export default DesktopTooltip;
