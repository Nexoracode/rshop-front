"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils/classnames";

function Drawer({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      activeSnapPoint={0.6}
      snapPoints={[0.6, 1]}
      modal={true}
      {...props}
    />
  );
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 !opacity-55 z-50 bg-black/80",
        "transition-opacity duration-300 ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  title,
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const openedRef = React.useRef(false);

  React.useEffect(() => {
    if (open && !openedRef.current) {
      window.history.pushState({ drawerOpen: true }, "");
      openedRef.current = true;
    }

    if (!open && openedRef.current) {
      // Clean up history entry when closed (prevents extra back steps)
      window.history.replaceState(null, "");
      openedRef.current = false;
    }
  }, [open]);

  React.useEffect(() => {
    const handlePopState = () => {
      if (openedRef.current) {
        // Close drawer on browser back
        onOpenChange?.(false);
        openedRef.current = false;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onOpenChange]);

  return (
    <DrawerPortal>
      <DrawerOverlay />

      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed inset-x-0 bottom-0 z-50 flex flex-col",
          "bg-background rounded-t-2xl border-t max-h-[100dvh]",
          className,
        )}
        {...props}
      >
        {/* Handle bar for drag */}
        <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-muted-light" />

        {/* Header with title and close */}
        <div className="relative border-b flex items-center justify-between px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)]">
          {title && <h3 className="text-sm font-medium text-right">{title}</h3>}

          <DrawerClose asChild>
            <button
              className="text-muted-foreground hover:text-foreground text-xl leading-none"
              aria-label="Close drawer"
            >
              ×
            </button>
          </DrawerClose>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-[340px]">
          {children}
        </div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  title,
  ...props
}: React.ComponentProps<"div"> & { title?: string }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "relative flex border-b items-center justify-start px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)]",
        className,
      )}
      {...props}
    >
      {title && (
        <h3 className="text-sm text-muted font-medium text-center flex-1">
          {title}
        </h3>
      )}

      <DrawerClose asChild>
        <button
          className="absolute left-4 top-[calc(env(safe-area-inset-top)+8px)] font-bold hover:text-foreground text-xl leading-none"
          aria-label="بستن"
        >
          ×
        </button>
      </DrawerClose>
    </div>
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
