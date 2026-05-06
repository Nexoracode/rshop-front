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
  MapIcon,
  MessageCircle,
  ShoppingBag,
  User2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutButton from "../../../domain/profile/LogoutButton";
import UserMenuItem from "./UserMenuItem";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrentUser from "@/hooks/useCurrentUser";

const menuItems = [
  { label: "سفارش ها", Icon: ShoppingBag, href: "orders" },
  { label: "آدرس ها", Icon: MapIcon, href: "address" },
  { label: "علاقه مندی ها", Icon: Heart, href: "wishlist" },
  { label: "دیدگاه ها", Icon: MessageCircle, href: "reviews" },
];

export default function ProfileMenu() {
  const { user, isPending } = useCurrentUser();
  const path = usePathname();
  return isPending ? (
    <Skeleton className="h-8 w-33" />
  ) : user ? (
    <>
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
        <PopoverContent className="p-0 rounded-lg" align="end">
          <div className="p-4">
            <Link
              href="/profile"
              className="flex items-center justify-between gap-1.5 mb-4"
            >
              <div className="flex items-center gap-2">
                <span className="!w-10 !h-10 rounded-lg bg-slate-100 content-center">
                  <UserIcon size={24} className="text-slate-600" />
                </span>
                <span className="w-42 truncate text-sm text-slate-800">
                  {user.first_name ? (
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                  ) : (
                    <span className="text-sm text-muted">{user.phone}</span>
                  )}
                </span>
              </div>
              <ChevronLeft size={19} className="text-slate-700" />
            </Link>
            {menuItems.map(({ Icon, href, label }) => (
              <UserMenuItem
                key={href}
                Icon={<Icon size={19} />}
                label={label}
                href={`/profile/${href}`}
              />
            ))}

            <div className="pr-2">
              <LogoutButton />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <Button
      href={{ pathname: "/users/login", query: { backUrl: path } }}
      variant={"outline"}
      color="neutral"
      className="text-black border h-[40px] rounded-md border-slate-300"
      size={"sm"}
      aria-label="ورود"
      startIcon={<LogInIcon className="-scale-x-100 text-gray-700" size={22} />}
    >
      <span className="inline-block text-[13px]">ورود | ثبت نام</span>
    </Button>
  );
}
