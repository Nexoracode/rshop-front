"use client";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      {...props}
      direction="bottom"
      snapPoints={[0.5, 1]}
      activeSnapPoint={0.5}
      modal={false}
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
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  onClose,
  title,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  onClose: () => void;
  title?: string;
}) {
  const openedRef = React.useRef(false);

  // push state وقتی باز می‌شود
  React.useEffect(() => {
    if (!openedRef.current) {
      window.history.pushState({ drawer: true }, "");
      openedRef.current = true;
    }

    const onPopState = (e: PopStateEvent) => {
      // فقط وقتی drawer باز است، close کن
      if (openedRef.current) {
        openedRef.current = false;
        onClose();
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [onClose]);

  return (
    <DrawerPortal>
      <DrawerOverlay />

      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed inset-x-0 bottom-0 z-50 flex flex-col",
          "bg-background rounded-t-2xl border-t h-[100dvh]",
          className
        )}
        {...props}
      >
        {/* Handle */}
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-muted" />

        {/* Header با دکمه Close */}
        <div className="relative flex items-center justify-center px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)]">
          {title && (
            <h3 className="text-sm font-semibold text-center">{title}</h3>
          )}
          <button
            onClick={onClose}
            className="absolute right-4 top-[calc(env(safe-area-inset-top)+8px)] text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
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
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="text-sm text-muted font-semibold text-center">
          {title}
        </h3>
      )}

      <DrawerClose asChild>
        <button className="absolute left-4 top-[calc(env(safe-area-inset-top)+8px)] font-bold hover:text-foreground">
          ✕
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
      className={cn("text-foreground font-semibold", className)}
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
