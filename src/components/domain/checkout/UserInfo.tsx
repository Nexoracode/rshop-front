"use client";

import { AlertCircleIcon } from "lucide-react";
import React from "react";
import UpdateUserInfoDialog from "./UpdateUserInfoDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toFaDigits } from "@/lib/utils/price";
import { User } from "@/types/user";

export default function UserInfo({
  isPending,
  user,
}: {
  user: User | null;
  isPending: boolean;
}) {
  if (isPending || !user) {
    return (
      <div className="border-b h-[80px] pb-4">
        <Skeleton className="w-full flex items-center h-full p-6">
          <p className="text-sm"> در حال دریافت اطلاعات شما...</p>
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="px-2">
      <div className="w-full border-b pb-8">
        {user?.first_name ? (
          <div className="flex items-center flex-wrap gap-8">
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

              <div className="font-medium text-sm text-muted">
                {toFaDigits(user.phone)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-8 w-full">
            <div className="flex-1 flex items-center gap-2 font-medium text-danger text-sm">
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
