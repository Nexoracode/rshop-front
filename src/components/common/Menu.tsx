"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Color } from "@/types";
import { cn } from "@/lib/utils/classnames";

export type MenuItem = {
  label: string;
  Icon: React.ElementType;
  onClick: () => void;
  color?: Color;
};
type MenuProps = {
  items: Array<MenuItem>;
  className?: string;
};
export function Menu({ items, className = "" }: MenuProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={className}
    >
      {/* دسکتاپ */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="text" rounded={"full"} color="neutral" size="sm">
              <MoreVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {items.map(({ Icon, label, onClick, color = "neutral" }) => (
              <DropdownMenuItem key={label} onClick={onClick}>
                <Icon className={cn("size-5", `text-${color}`)} /> {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* موبایل */}
      <div className="md:hidden">
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="text" color="neutral" rounded={"full"} size="md">
              <MoreVertical className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-xl pb-8 px-6"
            dir="rtl"
          >
            <div className="mt-6 flex flex-col gap-3 text-sm">
              {items.map(({ Icon, label, onClick, color = "neutral" }) => (
                <SheetClose key={label} asChild>
                  <Button
                    variant={"text-nohover"}
                    onClick={onClick}
                    size={"sm"}
                    className="w-full justify-start text-slate-700"
                    startIcon={
                      <Icon className={cn("size-5", `text-${color}`)} />
                    }
                  >
                    {label}
                  </Button>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
