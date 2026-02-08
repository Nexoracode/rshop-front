"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  Heart,
  LogInIcon,
  MapIcon,
  MessageCircle,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutButton from "../../../profile/LogoutButton";
import UserMenuItem from "./UserMenuItem";
import { Skeleton } from "@/components/ui/skeleton";
import { getMe } from "@/queries/auth/auth";

const menuItems = [
  { label: "سفارش ها", Icon: ShoppingBag, href: "orders" },
  { label: "آدرس ها", Icon: MapIcon, href: "address" },
  { label: "علاقه مندی ها", Icon: Heart, href: "wishlist" },
  { label: "دیدگاه ها", Icon: MessageCircle, href: "reviews" },
];

export default function ProfileMenu() {
  const { data: user, isPending } = useQuery(getMe);
  const path = usePathname();
  return isPending ? (
    <Skeleton className="h-8 w-33" />
  ) : user ? (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="text-nohover"
            color="neutral"
            className="!flex items-center px-0"
            endIcon={<ChevronDown fill="#444" strokeWidth={0} size={18} />}
          >
            <UserRound size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0" align="end">
          <Link href="/profile" className="flex group mb-3 items-center px-3">
            <span className="w-10 h-10 rounded-full bg-neutral-200 content-center">
              <UserRound size={24} />
            </span>
            <span className="inline-block flex-1 ps-1">
              {user.first_name ? (
                <span>{`${user.first_name} ${user.last_name}`}</span>
              ) : (
                <span className="text-sm text-muted">{user.phone}</span>
              )}
            </span>

            <ChevronLeft />
          </Link>
          {menuItems.map(({ Icon, href, label }) => (
            <UserMenuItem
              key={href}
              Icon={<Icon />}
              label={label}
              href={`/profile/${href}`}
            />
          ))}

          <LogoutButton />
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <Button
      href={{ pathname: "/users/login", query: { backUrl: path } }}
      variant={"outline"}
      color="neutral"
      className="text-black border-muted-light"
      aria-label="ورود"
      startIcon={<LogInIcon className="-scale-x-100" />}
    >
      <span className="inline-block text-sm">ورود | ثبت نام</span>
    </Button>
  );
}
