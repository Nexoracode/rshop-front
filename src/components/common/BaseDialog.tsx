"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  title?: string;
  cancellLabel?: string;
  cancellButton?: boolean;
  actionLabel?: string;
  onClick?: () => void;
  onCancell?: () => void;
  loading?: boolean;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  hiddenFooter?: boolean;
  hiddenHeader?: boolean;
  footer?: React.ReactNode;
  className?: string;
};

export default function BaseDialog({
  open,
  onOpenChange,
  content,
  trigger,
  title,
  cancellLabel = "انصراف",
  actionLabel = "تایید",
  cancellButton,
  onClick,
  onCancell,
  loading,
  width = "md",
  hiddenFooter,
  footer,
  className,
}: Props) {
  const isMobile = useIsMobile();
  const maxWidth = `max-w-${width}`;
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        showCloseButton={!isMobile}
        className={cn(
          `mx-auto p-0  w-full md:max-h-[80vh] overflow-auto scrollbar-custom ${maxWidth}`,
          isMobile &&
            "translate-y-0 top-[unset] bottom-0 data-[state=closed]:animate-slide-out-left  data-[state=open]:animate-slide-in-left h-full rounded-none",
          className
        )}
      >
        <DialogHeader className="flex p-3 sticky z-50 top-0 left-0 right-0 bg-card flex-row items-center justify-between">
          {isMobile && (
            <DialogClose asChild>
              <Button
                variant={"text-nohover"}
                color="neutral"
                size={"sm"}
                className="inline-block w-fit px-0"
              >
                <ArrowRight />
              </Button>
            </DialogClose>
          )}
          <DialogTitle className="flex-1">{title}</DialogTitle>
          {!isMobile ? (
            <DialogClose asChild>
              <Button
                variant={"text-nohover"}
                color="neutral"
                size={"sm"}
                className="inline-block w-fit px-0"
              >
                <X className="size-6" />
              </Button>
            </DialogClose>
          ) : null}
        </DialogHeader>
        <div className="flex-1 p-3">{content}</div>
        {!hiddenFooter && (
          <DialogFooter className="flex h-fit p-3 flex-row">
            {footer || (
              <>
                {cancellButton && (
                  <DialogClose asChild>
                    <Button onClick={onCancell} fullWidth variant={"outline"}>
                      {cancellLabel}
                    </Button>
                  </DialogClose>
                )}

                <Button
                  onClick={onClick}
                  isLoading={loading}
                  color="primary"
                  variant={"fill"}
                  fullWidth
                >
                  {actionLabel}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
