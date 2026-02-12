"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { SHOP_NAME } from "@/data/assets";
import { cn } from "@/lib/utils/classnames";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  lastIsLink?: boolean;
};

const HOME_ITEM: BreadcrumbItem = {
  label: SHOP_NAME,
  href: "/",
};

export default function Breadcrumb({ items, className, lastIsLink }: Props) {
  // اگر Home قبلاً داده نشده بود، اضافه کن
  const hasHome = items.some((i) => i.href === "/");
  const finalItems = hasHome ? items : [HOME_ITEM, ...items];

  if (items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className={cn("w-full", className)}>
      <div className="flex items-center font-light text-sm text-muted-light">
        {finalItems.map((item, index) => {
          const isLast = index === finalItems.length - 1;
          return (
            <div key={index} className="flex items-center">
              {!isLast || lastIsLink ? (
                <Link
                  href={item.href ?? "#"}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {item.href === "/" && <Home className="size-4" />}
                  {item.label}
                </Link>
              ) : (
                <span className="text-muted font-medium">{item.label}</span>
              )}

              {!isLast && (
                <ChevronLeft className="mx-2 size-4 text-muted-light" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
