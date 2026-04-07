"use client";
import BackButton from "@/components/common/BackButton";
import { usePathname } from "next/navigation";
import React from "react";

const itemsByHref = [
  { href: "/profile/orders", label: "سفارش‌ها" },
  { href: "/profile/address", label: "آدرس‌ها" },
  { href: "/profile/reviews", label: "نظرات من" },
  { href: "/profile/support", label: "گفتگو با پشتیبانی" },
  { href: "/profile/wishlist", label: "علاقه‌مندی‌ها" },
  { href: "/profile/recent", label: "بازدیدهای اخیر" },
  { href: "/profile/account", label: "اطلاعات حساب" },
  { href: "/profile", label: "بازگشت به سایت" },
];

export default function ProfileHeader() {
  const pathName = usePathname();
  return (
    <header className="fixed bg-white   top-0 z-50 w-full border-b shadow backdrop-blur">
      <div className=" relative">
        <div className="container px-2 bg-white relative z-20 flex text-foreground items-center py-3 gap-3">
          <BackButton link={pathName === "/profile" ? "/" : "-1"} />

          <p className="text-sm font-medium">
            {itemsByHref.find((i) => pathName.startsWith(i.href))?.label}
          </p>
        </div>
      </div>
    </header>
  );
}
