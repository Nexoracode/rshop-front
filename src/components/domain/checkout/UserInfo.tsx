"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AlertCircleIcon } from "lucide-react";
import React from "react";
import UpdateUserInfoDialog from "./UpdateUserInfoDialog";
import { cn } from "@/lib/utils/classnames";
import { Skeleton } from "@/components/ui/skeleton";
import OrderNote from "./OrderNote";
import { PackageSelector } from "./PackageSelector";

export default function UserInfo() {
  const { user, isPending } = useCurrentUser();

  if (isPending || !user) {
    return <Skeleton className="w-full h-[48px]" />;
  }

  return (
    <div className={cn("bg-background", !user?.first_name && "border-danger")}>
      <div className="flex w-full">
        {user?.first_name ? (
          <div className="flex items-center flex-wrap gap-16">
            <div className="gap-2 items-center">
              <div className="text-[13px] text-muted-light mb-2">
                نام و نام خانوادگی:
              </div>

              <div className="font-medium text-sm text-muted">
                {user.first_name} {user.last_name}
              </div>
            </div>
            <div className="gap-2 items-center">
              <div className="text-[13px] text-muted-light mb-2">
                شماره همراه:
              </div>

              <div className="font-medium text-sm text-muted">{user.phone}</div>
            </div>
            <OrderNote />
            <PackageSelector />
          </div>
        ) : (
          <div className="items-center space-y-2 justify-between w-full">
            <div className="flex-1 flex items-center gap-2 font-medium text-danger text-sm border border-danger p-2 rounded-sm bg-danger/10">
              <AlertCircleIcon className="size-4" />
              جهت ثبت سفارش تکمیل اطلاعات کاربری الزامی است.
            </div>
            <UpdateUserInfoDialog />
          </div>
        )}
      </div>
    </div>
  );
}
