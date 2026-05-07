"use client";
import React, { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
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
export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useMutation(userLogout);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let test = null;
    if (isSuccess) {
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        router.refresh();
        test = setTimeout(() => {
          router.push("/");
        }, 500);
      }
      setOpen(false);
    }
    return () => {
      if (test) {
        clearTimeout(test);
      }
    };
  }, [isSuccess, setOpen]);

  const handleLogout = () => mutate();

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
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
