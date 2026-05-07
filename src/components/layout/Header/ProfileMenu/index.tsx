"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDownIcon,
  ChevronLeft,
  Heart,
  LogInIcon,
  MapPin,
  MessageCircle,
  ShoppingBag,
  User2Icon,
  Coins,
  Plus,
  LogOut,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutButton from "../../../domain/profile/LogoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfileMenu() {
  const { user, isPending } = useCurrentUser();
  const path = usePathname();

  if (isPending) {
    return <Skeleton className="h-8 w-33" />;
  }

  if (!user) {
    return (
      <Button
        href={{ pathname: "/users/login", query: { backUrl: path } }}
        variant="outline"
        color="neutral"
        className="text-black border h-[40px] rounded-md border-slate-300"
        size="sm"
        aria-label="ورود"
        startIcon={
          <LogInIcon className="-scale-x-100 text-gray-700" size={22} />
        }
      >
        <span className="inline-block text-[13px]">ورود | ثبت نام</span>
      </Button>
    );
  }

  const fullName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.phone;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="text-nohover"
          className="!flex items-center px-0 text-slate-700"
          endIcon={<ChevronDownIcon size={15} />}
        >
          <User2Icon size={24} className="text-slate-700" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0 rounded-lg shadow-xl w-[280px] overflow-hidden bg-white"
        align="end"
      >
        {/* top profile link - mesle oon HTML */}
        <Link
          href="/profile"
          className="block text-slate-700 border-b border-gray-100"
        >
          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-sm font-medium text-slate-800 truncate max-w-[200px]">
              {fullName}
            </span>
            <ChevronLeft size={20} className="text-slate-500" />
          </div>
        </Link>

        <ul className="pb-2">
          {/* Orders */}
          <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <Link
              href="/profile/orders"
              className="flex items-center text-slate-700 w-full"
            >
              <div className="w-12 pl-5 pr-1">
                <ShoppingBag size={22} />
              </div>
              <div className="flex-1 py-3 border-b border-gray-100">
                <span className="text-sm font-medium">سفارش‌ها</span>
              </div>
            </Link>
          </li>

          {/* Addresses */}
          <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <Link
              href="/profile/address"
              className="flex items-center text-slate-700 w-full"
            >
              <div className="w-12 pl-5 pr-1">
                <MapPin size={22} />
              </div>
              <div className="flex-1 py-3 border-b border-gray-100">
                <span className="text-sm font-medium">آدرس‌ها</span>
              </div>
            </Link>
          </li>

          {/* Wishlist / Favorites */}
          <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <Link
              href="/profile/wishlist"
              className="flex items-center text-slate-700 w-full"
            >
              <div className="w-12 pl-5 pr-1">
                <Heart size={22} />
              </div>
              <div className="flex-1 py-3 border-b border-gray-100">
                <span className="text-sm font-medium">لیست‌ها</span>
              </div>
            </Link>
          </li>

          {/* Comments */}
          <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <Link
              href="/profile/reviews"
              className="flex items-center text-slate-700 w-full"
            >
              <div className="w-12 pl-5 pr-1">
                <MessageCircle size={22} />
              </div>
              <div className="flex-1 py-3 border-b border-gray-100">
                <span className="text-sm font-medium">دیدگاه‌ها و پرسش‌ها</span>
              </div>
            </Link>
          </li>
          
          <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
            <Link
              href="/profile/recent"
              className="flex items-center text-slate-700 w-full"
            >
              <div className="w-12 pl-5 pr-1">
                <Eye size={22} />
              </div>
              <div className="flex-1 py-3 border-b border-gray-100">
                <span className="text-sm font-medium">بازدیدهای اخیر</span>
              </div>
            </Link>
          </li>

          {/* Logout */}
          <LogoutButton>
            <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-slate-700 w-full">
                <div className="w-12 pl-5 pr-1">
                  <LogOut size={22} />
                </div>
                <div className="flex-1 py-3">
                  <span className="text-sm font-medium">خروج از حساب کاربری</span>
                </div>
              </div>
            </li>
          </LogoutButton>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
