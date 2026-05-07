"use client";

import React from "react";
import ProfileButton from "./ProfileMenu";
import CartPopover from "./CartPopver";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function UserMenu() {
  const pathName = usePathname();
  const isProfilePage = pathName.startsWith("/profile");
  //  const isComparePage = pathName.startsWith("/compare");
  const isCartPage =
    pathName.startsWith("/cart") || pathName.startsWith("/checkout");
  return (
    <div className="hidden md:flex items-center gap-4">
      {/* {!isComparePage &&
        (isPending ? null : (
          <LinkWithChip
            Icon={<ArrowLeftRightIcon strokeWidth={2} size={22} />}
            href="/compare"
            label="مقایسه"
            count={data?.length ?? 0}
          />
        ))} */}
      {!isProfilePage && <ProfileButton />}

      <Separator orientation="vertical" className="!h-[25px] ml-2" />

      {!isCartPage && <CartPopover />}
    </div>
  );
}
