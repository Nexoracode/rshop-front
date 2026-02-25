"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Label } from "@radix-ui/react-dropdown-menu";
import { AlertCircleIcon } from "lucide-react";
import React from "react";
import UpdateUserInfoDialog from "./UpdateUserInfoDialog";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/classnames";

export default function UpdateUserInfo() {
  const { user } = useCurrentUser();
  return (
    <Card className={cn("bg-background", !user?.first_name && "border-danger")}>
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2 font-medium">
          {"اطلاعات سفارش دهنده"}
        </Label>

        <div className="flex  mt-8 gap-2 justify-between w-full">
          <div className="flex  w-full">
            {user?.first_name ? (
              <div className="flex gap-2">
                <div className="bg-neutral-50 p-2 gap-2 items-center">
                  <div className="text-xs text-muted-light">
                    نام و نام خانوادگی:
                  </div>

                  <div className="font-medium text-sm text-muted">
                    {user.first_name} {user.last_name}
                  </div>
                </div>
                <div className="bg-neutral-50 p-2 gap-2 items-center">
                  <div className="text-xs text-muted-light">شماره همراه:</div>

                  <div className="font-medium text-sm text-muted">
                    {user.phone}
                  </div>
                </div>
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
      </div>
    </Card>
  );
}
