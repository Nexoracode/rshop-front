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
  /*   { label: "بازدیدهای اخیر", href: "/profile/recent", icon: EyeIcon },
   */ { label: "اطلاعات حساب", href: "/profile/account", icon: Settings },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit w-full lg:w-[280px] bg-white rounded-lg lg:border overflow-hidden py-4">
      <ul>
        {items.map((item) => {
          const active =
            item.href === "/profile"
              ? pathname === "/profile"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li
              key={item.href}
              className={cn(
                "px-4 cursor-pointer w-full transition-all py-3",
                active
                  ? "bg-primary-50 border-r-4 border-primary"
                  : "hover:bg-gray-50  border-b border-gray-100",
              )}
            >
              <Link
                href={item.href}
                className="flex items-center text-slate-700 w-full"
              >
                <div className="w-12 pl-5 pr-1">
                  <Icon
                    size={22}
                    className={cn(active ? "text-primary" : "text-slate-600")}
                  />
                </div>
                <div className="flex-1">
                  <span
                    className={cn(
                      "text-sm",
                      active ? "text-primary font-semibold" : "font-medium",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

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
    </aside>
  );
}
