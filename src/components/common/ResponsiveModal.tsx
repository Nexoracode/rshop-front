// components/ui/responsive-modal.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ResponsiveModalProps {
  /** کنترل باز و بسته بودن مودال از بیرون */
  open?: boolean;
  /** callback وقتی وضعیت باز/بسته تغییر می‌کند */
  onOpenChange?: (open: boolean) => void;
  /** محتوای trigger (دکمه یا المان بازکننده) */
  trigger?: React.ReactNode;
  /** عنوان مودال */
  title?: React.ReactNode;
  /** توضیحات / زیرعنوان */
  description?: React.ReactNode;
  /** محتوای اصلی (فرم، متن، هر چیزی) */
  children: React.ReactNode;
  /** کلاس‌های اضافی برای Content */
  contentClassName?: string;
  /** آیا فوتر Cancel/Save خودکار اضافه شود؟ */
  showDefaultFooter?: boolean;
  /** متن دکمه Cancel */
  cancelText?: string;
  /** متن دکمه اصلی (Save/تایید) */
  actionText?: string;
  /** handler برای دکمه اصلی */
  onAction?: () => void;
  /** حداقل عرض دسکتاپ (پیش‌فرض 768px) */
  desktopBreakpoint?: string;
}

export function ResponsiveModal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  contentClassName,
  showDefaultFooter = true,
  cancelText = "انصراف",
  actionText = "ذخیره",
  onAction,
  desktopBreakpoint = "(min-width: 768px)",
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery(desktopBreakpoint);

  const Root = isDesktop ? Dialog : Drawer;
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger;
  const Content = isDesktop ? DialogContent : DrawerContent;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;
  const Footer = isDesktop ? DialogFooter : DrawerFooter;
  const Close = isDesktop ? DialogClose : DrawerClose;

  // برای دسکتاپ معمولاً max-width داریم
  const contentExtraClasses = isDesktop
    ? "sm:max-w-[425px] md:max-w-lg"
    : "text-left px-4 pb-8";

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Trigger asChild>{trigger}</Trigger>}

      <Content
        onClose={() => {}}
        className={cn(contentExtraClasses, contentClassName)}
      >
        {(title || description) && (
          <Header>
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </Header>
        )}

        <div className={cn("py-4", !isDesktop && "px-1")}>{children}</div>

        {showDefaultFooter && (
          <Footer className="sm:flex-row-reverse gap-3">
            <Close asChild>
              <button className="flex-1 sm:flex-none">{cancelText}</button>
            </Close>

            {onAction && (
              <button
                onClick={onAction}
                className={cn(
                  "flex-1 sm:flex-none",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "rounded-md px-4 py-2 text-sm font-medium"
                )}
              >
                {actionText}
              </button>
            )}
          </Footer>
        )}
      </Content>
    </Root>
  );
}
