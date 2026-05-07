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
  LogOut,
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
    <aside className="sticky top-20 h-fit w-full md:border lg:border-0 rounded-lg p-3 md:p-6 lg:p-4 lg:w-[16rem] md:space-y-2">
      <div className="grid md:grid-cols-4 gap-2 mb-4 lg:mb-0 lg:flex flex-col">
        {items.map((item) => {
          const active =
            item.href === "/profile"
              ? pathname === "/profile"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex border-b border-slate-200 md:border-0 items-center gap-3 md:rounded-md md:px-3 py-3 md:py-2 text-sm font-medium transition-colors",
                active
                  ? "md:bg-primary/10 md:text-primary"
                  : "hover:bg-slate-100 text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <p className="flex-1">{item.label}</p>
              <ChevronLeft className="md:hidden text-muted/40 size-4" />
            </Link>
          );
        })}
      </div>
      <hr className="hidden md:flex" />
      <div className="md:pr-2 md:-mt-2">
        <LogoutButton>
          <div className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <div className="flex items-center text-slate-700 w-full">
              <div className="w-12 pl-5 pr-1">
                <LogOut size={22} />
              </div>
              <div className="flex-1 py-3">
                <span className="text-sm font-medium">خروج از حساب کاربری</span>
              </div>
            </div>
          </div>
        </LogoutButton>
      </div>
    </aside>
  );
}
