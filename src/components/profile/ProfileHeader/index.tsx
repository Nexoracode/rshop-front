"use client";
import BackButton from "@/components/common/BackButton";
import { usePathname } from "next/navigation";
import React from "react";

const itemsByHref: Record<string, string> = {
  "/profile": "بازگشت به سایت",
  "/profile/orders": "سفارش‌ها",
  "/profile/address": "آدرس‌ها",
  "/profile/reviews": "نظرات من",
  "/profile/chat": "گفتگو با پشتیبانی",
  "/profile/wishlist": "علاقه‌مندی‌ها",
  "/profile/recent": "بازدیدهای اخیر",
  "/profile/account": "اطلاعات حساب",
};

export default function ProfileHeader() {
  const pathName = usePathname();
  return (
    <header className="fixed bg-white   top-0 z-50 w-full border-b shadow backdrop-blur">
      <div className=" relative">
        <div className="container px-2 bg-white relative z-20 flex text-foreground items-center py-3 gap-3">
          <BackButton link={pathName === "/profile" ? "/" : "/profile"} />

          <p className="text-sm font-semibold">{itemsByHref[pathName]}</p>
        </div>
      </div>
    </header>
  );
}
