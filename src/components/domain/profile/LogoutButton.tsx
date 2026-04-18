"use client";
import React, { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import BaseDialog from "@/components/common/BaseDialog";
import { userLogout } from "@/queries/auth/auth";
import { usePathname, useRouter } from "next/navigation";

const protectedRoutes = [
  "/profile",
  "/checkout",
  "/cart",
  "/wishlist",
  "/compare",
];
export default function LogoutButton() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useMutation(userLogout);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      mutate();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        router.push("/");
      }
    }
  }, [isSuccess, setOpen]);
  return (
    <React.Fragment>
      <Button
        color="danger"
        onClick={() => setOpen(true)}
        startIcon={<LogOutIcon size={22} />}
        size={"sm"}
        className="p-0 mt-2.5"
        variant={"text-nohover"}
      >
        <span className="text-[13px] pr-1">خروج از حساب کاربری</span>
      </Button>
      <BaseDialog
        title="از حساب کاربری خارج می شوید؟"
        content={
          <div className="flex flex-col gap-3 items-center">
            <LogOutIcon className="size-24 opacity-15" />
            <p className="text-base font-medium text-danger">
              از حساب کاربری خارج می شوید؟
            </p>
            <p className="text-sm text-muted text-center leading-8">
              با خروج از حساب کاربری به سبد خرید فعلی تان دسترسی نخواهید داشت
            </p>
          </div>
        }
        onOpenChange={setOpen}
        open={open}
        actionLabel="خروج از حساب"
        onClick={handleLogout}
        loading={isPending}
        cancellButton
      />
    </React.Fragment>
  );
}
