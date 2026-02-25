"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/classnames";

import {
  User,
  Heart,
  MapPin,
  ShoppingBag,
  MessageSquare,
  Star,
  Settings,
  EyeIcon,
  ChevronLeft,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const items = [
  { label: "پروفایل من", href: "/profile", icon: User },
  { label: "سفارش‌ها", href: "/profile/orders", icon: ShoppingBag },
  { label: "آدرس‌ها", href: "/profile/address", icon: MapPin },
  { label: "نظرات من", href: "/profile/reviews", icon: Star },
  { label: "گفتگو با پشتیبانی", href: "/profile/support", icon: MessageSquare },
  { label: "علاقه‌مندی‌ها", href: "/profile/wishlist", icon: Heart },
  { label: "بازدیدهای اخیر", href: "/profile/recent", icon: EyeIcon },
  { label: "اطلاعات حساب", href: "/profile/account", icon: Settings },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-card sticky top-20 h-fit rounded-sm md:border md:border-border md:w-[16rem] md:p-4 md:space-y-2">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex border-b md:border-0 items-center gap-3 md:rounded-lg md:px-3 py-3 md:py-2 text-sm font-medium transition-colors",
              active
                ? "md:bg-primary/10 md:text-primary"
                : "hover:bg-muted/30 text-muted-foreground",
            )}
          >
            <Icon className="w-5 h-5" />
            <p className="flex-1">{item.label}</p>
            <ChevronLeft className="md:hidden text-muted/40 size-4" />
          </Link>
        );
      })}

      <div className="mt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
