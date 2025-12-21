"use client";
import React from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import { getCompareList } from "@/queries/compare";
import { useQuery } from "@tanstack/react-query";
import ProfileButton from "./ProfileMenu";
import { Separator } from "@/components/ui/separator";
import CartPopover from "./CartPopver";
import LinkWithChip from "@/components/common/LinkWithChip";
import { usePathname } from "next/navigation";

export default function UserMenu() {
  const pathName = usePathname();
  const isProfilePage = pathName.startsWith("/profile");
  const isComparePage = pathName.startsWith("/compare");
  const isCartPage =
    pathName.startsWith("/cart") || pathName.startsWith("/checkout");
  const { data } = useQuery(getCompareList);
  return (
    <div className="hidden md:flex items-center gap-4">
      {!isComparePage && (
        <LinkWithChip
          Icon={<ArrowLeftRightIcon strokeWidth={2} size={22} />}
          href="/compare"
          label="مقایسه"
          count={data?.length ?? 0}
        />
      )}
      {!isProfilePage && <ProfileButton />}

      {!isCartPage && (
        <>
          <Separator orientation="vertical" className="!h-[25px]" />
          <CartPopover />
        </>
      )}
    </div>
  );
}
